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
 * Update Photo
 */
const updatePhoto = async (req, res) => {
  try {
    const id = _.get(req, 'params.id', null);
    const body = _.get(req, 'body', null);
    if (!id || !body) return res.status(500).send({ error: 'Cannot GET photo' });

    const result = await Photo.findByIdAndUpdate(id, body);
    if (!result) return res.status(404).send({ error: 'Cannot UPDATE photo' });

    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send(err);
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

module.exports = {
  createPhoto,
  getPhoto,
  updatePhoto,
  getAllPhotos,
};
