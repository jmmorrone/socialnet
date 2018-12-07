const express = require('express');
const user = require('../controllers/user');
const { verifyJwt } = require('../controllers/auth');

const router = express.Router();

/**
 * Create User
 */
router.post('/users', user.createUser);

/**
 * Get User
 */
router.get('/users/:id', verifyJwt, user.getUser);

/**
 * Update User
 */
router.patch('/users/:id', verifyJwt, user.updateUser);

/**
 * All users
 */
router.get('/users', user.getAllUsers);

/**
 * Follow User
 */
router.patch('/users/:id/follow', verifyJwt, user.followUser);

/**
 * Login
 */
router.post('/login', user.login);

module.exports = router;
