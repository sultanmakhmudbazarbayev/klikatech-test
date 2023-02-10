const express = require('express');
const router = express.Router();
const controller = require('./controller');

/// Get songs
router.get('/', controller.getMusic);

/// Get genres
router.get('/genres', controller.getGenres);

module.exports = router;
