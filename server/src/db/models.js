const Artist = require('./models/artist');
const Genre = require('./models/genre');
const Song = require('./models/song');

Song.belongsTo(Artist, {
  as: 'artist',
  foreignKey: 'artist_id',
});

Song.belongsTo(Genre, {
  as: 'genre',
  foreignKey: 'genre_id',
});

module.exports = {
  Artist,
  Genre,
  Song,
};
