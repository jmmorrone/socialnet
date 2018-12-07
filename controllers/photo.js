const _ = require('lodash');
const Photo = require('../models/photo');

/**
 * Create Photo
 */
const createPhoto = async (req, res) => {
  try {
    const body = _.get(req, 'body', null);
    if (!body) return res.status(500).send({ error: 'Cannot POST photo' });

    const photo = new Photo(body);
    const result = await photo.save();

    return res.status(201).send(result);
  } catch (err) {
    return res.status(500).send(err);
  }
};

/**
 * Read Photo
 */
const getPhoto = async (req, res) => {
  try {
    const id = _.get(req, 'params.id', null);
    if (!id) return res.status(500).send({ error: 'Cannot GET photo' });

    const result = await Photo.findById(id);

    return res.send(result);
  } catch (err) {
    return res.status(404).send({ error: 'Cannot GET photo' });
  }
};

/**
 * All photos
 */
const getAllPhotos = async (req, res) => {
  try {
    const result = await Photo.find().exec();
    if (!result) return res.status(404).send({ error: 'Cannot GET photos' });

    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send({ error: 'Cannot GET photos' });
  }
};

/**
 * Like Photo
 */
const likePhoto = async (req, res) => {
  try {
    const id = _.get(req, 'params.id', null);
    if (!id) return res.status(500).send({ error: 'Cannot GET photo' });

    const result = await Photo.findByIdAndUpdate(id, { $inc: { likes: 1 } });
    if (!result) return res.status(404).send({ error: 'Cannot LIKE photo' });

    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send(err);
  }
};

/**
 * Comment Photo
 */
const commentPhoto = async (req, res) => {
  try {
    const id = _.get(req, 'params.id', null);
    if (!id) return res.status(500).send({ error: 'Cannot GET photo' });

    const result = await Photo.findByIdAndUpdate(id, { $inc: { comments: 1 } });
    if (!result) return res.status(404).send({ error: 'Cannot COMMENT photo' });

    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = {
  createPhoto,
  getPhoto,
  likePhoto,
  commentPhoto,
  getAllPhotos,
};
