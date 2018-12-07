const express = require('express');
const photo = require('../controllers/photo');

const router = express.Router();

/**
 * Create Photo
 */
router.post('/photos', photo.createPhoto);

/**
 * Get Photo
 */
router.get('/photos/:id', photo.getPhoto);

/**
 * Update Photo
 */
router.patch('/photos/:id', photo.updatePhoto);

/**
 * All photos
 */
router.get('/photos', photo.getAllPhotos);

module.exports = router;
