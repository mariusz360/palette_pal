var Palette = React.createClass({
  propTypes: {
    hex: React.PropTypes.string,
    likable: React.PropTypes.bool,
    onPaletteLikesUpdate: React.PropTypes.func,
    palette: React.PropTypes.object,
    paletteLikes: React.PropTypes.array,
    searchPath: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      likable: true
    }
  },

  isSearchable: function() {
    return !!this.props.searchPath;
  },

  onColorClick: function(hex) {
    if (this.isSearchable()) {
      window.location = this.props.searchPath + '?hex=' + hex;
    }
  },

  render: function() {
    var { hex, onPaletteLikesUpdate, palette, paletteLikes } = this.props;

    return (
      <div>
        <div className="row">
          <div className="col-xs-12">
            <h1 className="text-center">
              {palette.title}
              {
                this.props.likable &&
                  <LikePaletteButton onPaletteLikesUpdate={onPaletteLikesUpdate}
                                     palette={palette}
                                     paletteLikes={paletteLikes}/>
              }
            </h1>
            <br/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-1"></div>
          {palette.colors.map(function (color, index) {
            return (
              <div key={color + palette.id + index} className="col-xs-6 col-sm-2">
                <div className={'color ' + (this.isSearchable() ? 'searchable' : '')} onClick={this.onColorClick.bind(this, color)} style={{ backgroundColor: '#' + color }}>
                </div>
                <p className={'hex ' + (color === hex ? 'searched' : '')}>
                  #{color}
                </p>
              </div>
            );
          }.bind(this))}
        </div>
      </div>
    );
  }
});
