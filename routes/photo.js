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
 * All photos
 */
router.get('/photos', photo.getAllPhotos);

/**
 * Like Photo
 */
router.patch('/photos/:id/like', photo.likePhoto);

/**
 * Comment Photo
 */
router.patch('/photos/:id/comment', photo.commentPhoto);

module.exports = router;
