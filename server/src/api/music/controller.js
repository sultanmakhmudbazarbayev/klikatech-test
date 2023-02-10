const { tryCatch } = require('../errors/tryCatch');
const service = require('./service');

exports.getMusic = tryCatch(async (req, res) => {
  const pagination = {
    limit: req.query.limit ?? 10,
    offset: req.query.offset ?? 0,
  };

  const filter = {
    genre_id: req.query.genre_id ?? -1,
    artist_id: req.query.artist_id ?? -1,
    year: req.query.year ?? -1,
  };

  const songs = await service.getMusic(pagination, filter);

  return res.status(200).send(songs);
});

exports.getGenres = tryCatch(async (req, res) => {
  const genres = await service.getGenres();

  return res.status(200).send(genres);
});
