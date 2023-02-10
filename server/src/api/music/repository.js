const { Artist, Genre, Song } = require('../../db/models');

exports.getMusic = async (pagination, filter) => {
  const songs = await Song.findAll({
    where: filter,
    limit: pagination.limit,
    offset: pagination.offset,
    attributes: ['id', 'song', 'year'],
    include: [
      {
        model: Artist,
        as: 'artist',
        attributes: ['artist_name', 'id'],
      },
      {
        model: Genre,
        as: 'genre',
        attributes: ['genre', 'id'],
      },
    ],
  });

  return songs;
};

exports.getGenres = async () => {
  const genres = await Genre.findAll({
    attributes: ['id', 'genre'],
  });

  return genres;
};
