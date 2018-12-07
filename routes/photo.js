const express = require('express');
const photo = require('../controllers/photo');
const { verifyJwt } = require('../controllers/auth');

const router = express.Router();

/**
 * Create Photo
 */
router.post('/photos', verifyJwt, photo.createPhoto);

/**
 * Get Photo
 */
router.get('/photos/:id', verifyJwt, photo.getPhoto);

/**
 * All photos
 */
router.get('/photos', verifyJwt, photo.getAllPhotos);

/**
 * Like Photo
 */
router.patch('/photos/:id/like', verifyJwt, photo.likePhoto);

/**
 * Comment Photo
 */
router.patch('/photos/:id/comment', verifyJwt, photo.commentPhoto);

module.exports = router;
