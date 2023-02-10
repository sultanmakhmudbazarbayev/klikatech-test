const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const AppError = require('./api/errors/appError');
const globalErrorHandler = require('./api/middlewares/globalErrorHandler');
const apiRoutes = require('./api/routes');
const errorCodes = require('./api/errors/errorCodes');

const app = express();

app.use(express.static(__dirname + '../public'));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/// Routes
app.use(apiRoutes);

/// For handling errors glabally
app.use(globalErrorHandler);

// For every other routes
app.all('*', (req, res, next) => {
  next(new AppError(errorCodes.NOT_FOUND.msg, errorCodes.NOT_FOUND.code));
});

module.exports = app;
