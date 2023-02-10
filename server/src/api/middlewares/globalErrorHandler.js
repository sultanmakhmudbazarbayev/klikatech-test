module.exports = (error, req, res, next) => {
  if (error) {
    const statusCode = error.statusCode ?? 500;

    return res.status(statusCode).send({
      msg: 'error',
      info: error.message,
    });
  }
};
