var PaletteLikesService = React.createClass({
  statics: {
    getAll: function() {
      return $.get('/api/v1/palette_likes');
    },

    create: function(data) {
      return $.post('/api/v1/palette_likes', {
        palette_like: data
      });
    },

    delete: function(id) {
      return $.ajax('/api/v1/palette_likes/' + id, {
        type: 'delete'
      });
    }
  },
  render: function() {
  }
});
