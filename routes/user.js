const express = require('express');
const user = require('../controllers/user');

const router = express.Router();

/**
 * Create User
 */
router.post('/users', user.createUser);

/**
 * Get User
 */
router.get('/users/:id', user.getUser);

/**
 * Update User
 */
router.patch('/users/:id', user.updateUser);

/**
 * All users
 */
router.get('/users', user.getAllUsers);

module.exports = router;
