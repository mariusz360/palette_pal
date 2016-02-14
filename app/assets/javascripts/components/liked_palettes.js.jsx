var LikedPalettes = React.createClass({
  getInitialState: function() {
    return {
      palettes: [],
      paletteLikes: []
    }
  },

  componentDidMount: function() {
    PaletteLikesService.getAll().then(function(response) {
      this.setState({
        paletteLikes: response.palette_likes
      });

      var promise = $.when();
      this.state.paletteLikes.forEach(function(paletteLike) {
        promise.then(function() {
          this.getPalette(paletteLike.palette_id);
        }.bind(this));
      }.bind(this));
    }.bind(this));
  },

  onPaletteLikesUpdate: function(paletteLikes) {
    this.setState({
      paletteLikes: paletteLikes
    });
  },

  getPalette: function(paletteId) {
    return $.ajax('http://www.colourlovers.com/api/palette/' + paletteId, {
      data: {
        format: 'json'
      },
      dataType: 'jsonp',
      crossDomain: true,
      jsonp: 'jsonCallback'
    }).done(function(palettes) {
      this.setState({
        palettes: this.state.palettes.concat(palettes)
      });
    }.bind(this));
  },

  render: function() {
    return (
      <div>
        {this.state.palettes.map(function (palette) {
          return (
            <div key={palette.id}>
              <Palette palette={palette} paletteLikes={this.state.paletteLikes} onPaletteLikesUpdate={this.onPaletteLikesUpdate}/>
            </div>
          );
        }.bind(this))}
      </div>
    );
  }
});
