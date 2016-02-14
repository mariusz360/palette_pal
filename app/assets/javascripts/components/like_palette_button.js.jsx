var LikePaletteButton = React.createClass({
  propTypes: {
    onPaletteLikesUpdate: React.PropTypes.func,
    palette: React.PropTypes.object,
    paletteLikes: React.PropTypes.array
  },

  componentWillMount: function() {
    this.updatePaletteLike(this.props.palette, this.props.paletteLikes);
  },

  componentWillReceiveProps: function(nextProps) {
    this.updatePaletteLike(nextProps.palette, nextProps.paletteLikes);
  },

  updatePaletteLike: function(palette, paletteLikes) {
    var paletteLike = paletteLikes.find(function(paletteLike) {
      return paletteLike.palette_id === palette.id;
    });
    this.setState({ paletteLike: paletteLike });
  },

  like: function() {
    PaletteLikesService.create({
      palette_id: this.props.palette.id
    }).then(function(response) {
      this.props.onPaletteLikesUpdate(response.palette_likes);
    }.bind(this));
  },

  unlike: function() {
    PaletteLikesService.delete(this.state.paletteLike.id).then(function(response) {
      this.props.onPaletteLikesUpdate(response.palette_likes);
    }.bind(this));
  },

  render: function() {
    return (
      <span>
        {
          this.state.paletteLike ?
            <a className="likePaletteButton liked" onClick={this.unlike}><fa className="fa fa-star"></fa></a> :
            <a className="likePaletteButton unliked" onClick={this.like}><fa className="fa fa-star-o"></fa></a>
        }
      </span>
    );
  }
});
