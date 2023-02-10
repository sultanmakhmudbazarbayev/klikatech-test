const { Artist, Genre, Song } = require('../../db/models');
const { Op, Sequelize } = require('sequelize');

exports.getMusic = async (pagination, filter) => {
  songsFilter = {};
  artistsFilter = {};
  genresFilter = {};

  if (filter.genre_id !== -1) {
    songsFilter.genre_id = filter.genre_id;
  }
  if (filter.year !== -1) {
    songsFilter.year = +filter.year;
  }
  if (filter.song_name !== -1) {
    songsFilter.song = {
      [Op.like]: '%' + filter.song_name + '%',
    };
  }

  if (filter.artist_name !== -1) {
    artistsFilter.artist_name = {
      [Op.like]: '%' + filter.artist_name + '%',
    };
  }

  const songs = await Song.findAndCountAll({
    where: songsFilter,
    limit: pagination.limit,
    offset: pagination.offset,
    attributes: ['id', 'song', 'year'],
    raw: true,
    include: [
      {
        model: Artist,
        as: 'artist',
        where: artistsFilter,
        attributes: ['artist_name'],
      },
      {
        model: Genre,
        as: 'genre',
        attributes: ['genre'],
      },
    ],
  });

  /// Renaming object key
  songs.data = songs.rows;
  delete songs.rows;

  return songs;
};

exports.getGenres = async () => {
  const genres = await Genre.findAll({
    attributes: ['id', 'genre'],
  });

  return genres;
};
