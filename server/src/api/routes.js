const express = require('express');
const router = express.Router();
const musicRoutes = require('./music/routes');

/// This file for managing all routes that exist in API folder as separate service

/// Manage music
router.use('/music', musicRoutes);

module.exports = router;
