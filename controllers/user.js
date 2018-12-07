const _ = require('lodash');
const User = require('../models/user');
const { createJwt } = require('./auth');

/**
 * Create User
 */
const createUser = async (req, res) => {
  try {
    const body = _.get(req, 'body', null);
    if (!body) return res.status(500).send({ error: 'Cannot POST user' });

    const user = new User(body);
    user.password = user.generateHash(user.password);
    const result = await user.save();

    const token = createJwt(result.nickname);
    res.set('x-access-token', token);

    return res.status(200).send({ auth: true });
  } catch (err) {
    return res.status(500).send(err);
  }
};

/**
 * Read User
 */
const getUser = async (req, res) => {
  try {
    const id = _.get(req, 'params.id', null);
    if (!id) return res.status(500).send({ error: 'Cannot GET user' });

    const result = await User.findById(id);

    return res.send(result);
  } catch (err) {
    return res.status(404).send({ error: 'Cannot GET user' });
  }
};

/**
 * Update User
 */
const updateUser = async (req, res) => {
  try {
    const id = _.get(req, 'params.id', null);
    const body = _.get(req, 'body', null);
    if (!id || !body) return res.status(500).send({ error: 'Cannot GET user' });

    const result = await User.findOneAndUpdate(id, body, { new: true });
    if (!result) return res.status(404).send({ error: 'Cannot UPDATE user' });

    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send(err);
  }
};

/**
 * All users
 */
const getAllUsers = async (req, res) => {
  try {
    const result = await User.find().exec();
    if (!result) return res.status(404).send({ error: 'Cannot GET users' });

    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send({ error: 'Cannot GET users' });
  }
};

/**
 * Follow User
 */
const followUser = async (req, res) => {
  try {
    const id = _.get(req, 'params.id', null);
    const body = _.get(req, 'body', null);
    if (!id || !body) return res.status(500).send({ error: 'Cannot GET user' });

    const followedUserId = _.get(body, 'userId', null);
    if (id === followedUserId) return res.status(500).send({ error: 'Cannot follow yourself' });
    const followedUser = await User.findById(followedUserId);

    if (!followedUser) return res.status(404).send({ error: 'Cannot find user to be followed' });

    const result = await User.findByIdAndUpdate(id, { $push: { following: followedUserId } }, { new: true });
    if (!result) return res.status(404).send({ error: 'Cannot FOLLOW user' });

    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send(err);
  }
};

/**
 * Login
 */
const login = async (req, res) => {
  try {
    const body = _.get(req, 'body', null);
    if (!body) return res.status(500).send({ error: 'Incorrect data' });

    const result = await User.findOne({ nickname: body.nickname });
    if (!result) return res.status(404).send({ error: 'Cannot GET user' });
    if (!result.validPassword(body.password, result.password)) return res.status(401).send({ error: 'Incorrect password' });

    const token = createJwt(body.nickname);
    res.set('x-access-token', token);
    return res.status(200).send({ auth: true });
  } catch (err) {
    return res.status(404).send({ error: 'Cannot GET user' });
  }
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  getAllUsers,
  followUser,
  login,
};
