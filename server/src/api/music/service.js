const repository = require('./repository');
const AppError = require('../errors/appError');
const errorCodes = require('../errors/errorCodes');

exports.getMusic = async (pagination, filter) => {
  pagination.offset = +pagination.offset;
  pagination.limit = +pagination.limit;

  const songs = await repository.getMusic(pagination, filter);

  if (!songs || songs.length === 0) {
    throw new AppError(errorCodes.NOT_FOUND.msg, errorCodes.NOT_FOUND.code);
  }

  return songs;
};

exports.getGenres = async () => {
  const genres = await repository.getGenres();

  if (!genres || genres.length === 0) {
    throw new AppError(errorCodes.NOT_FOUND.msg, errorCodes.NOT_FOUND.code);
  }

  return genres;
};
