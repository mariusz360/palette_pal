var PaletteBrowser = React.createClass({
  propTypes: {
    hex: React.PropTypes.string,
    likable: React.PropTypes.bool,
    searchPath: React.PropTypes.string
  },

  getInitialState: function() {
    return {
      currentIndex: 0,
      palettes: [],
      paletteLikes: []
    };
  },

  componentDidMount: function() {
    this.getPalettes();
    if (this.props.likable) {
      PaletteLikesService.getAll().then(function(response) {
        this.setState({
          paletteLikes: response.palette_likes
        });
      }.bind(this));
    }
  },

  onPaletteLikesUpdate: function(paletteLikes) {
    this.setState({
      paletteLikes: paletteLikes
    })
  },

  nextPalette: function() {
    var paletteCount = this.state.palettes.length,
        newIndex     = this.state.currentIndex + 1;

    if (this.state.loading || newIndex > paletteCount) {
      return;
    }

    if (newIndex == paletteCount) {
      this.getPalettes().then(function() {
        this.setCurrentIndex(newIndex);
      }.bind(this));
    } else {
      this.setCurrentIndex(newIndex);
    }
  },

  previousPalette: function() {
    var newIndex = this.state.currentIndex - 1;

    if (newIndex >= 0) {
      this.setCurrentIndex(newIndex);
    }
  },

  setCurrentIndex: function(index) {
    this.setState({
      currentIndex: index
    });
  },

  getPalettes: function() {
    this.setState({loading: true});
    return $.ajax('http://www.colourlovers.com/api/palettes/top', {
      data: {
        format: 'json',
        hex: this.props.hex,
        resultOffset: this.state.palettes.length
      },
      dataType: 'jsonp',
      crossDomain: true,
      jsonp: 'jsonCallback'
    }).done(function(newPalettes) {
      this.setState({
        loading: false,
        palettes: $.merge(this.state.palettes, newPalettes)
      });
    }.bind(this));
  },

  render: function() {
    var currentPalette = this.state.palettes[this.state.currentIndex];

    return (
      <div className="row">
        <div className="col-xs-1">
          <a className="chevronContainer" onClick={this.previousPalette} disabled={this.state.currentIndex <= 0}>
            <i className="fa fa-4x fa-chevron-left"></i>
          </a>
        </div>
        <div className="col-xs-10">
          {
            currentPalette &&
              <Palette hex={this.props.hex}
                       likable={this.props.likable}
                       onPaletteLikesUpdate={this.onPaletteLikesUpdate}
                       palette={currentPalette}
                       paletteLikes={this.state.paletteLikes}
                       searchPath={this.props.searchPath}/>
          }
        </div>
        <div className="col-xs-1">
          <a className="chevronContainer" onClick={this.nextPalette} disabled={this.state.currentIndex >= this.state.palettes.length}>
            <i className="fa fa-4x fa-chevron-right"></i>
          </a>
        </div>
      </div>
    );
  }
});
