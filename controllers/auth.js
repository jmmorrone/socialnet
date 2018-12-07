const jwt = require('jsonwebtoken');
const _ = require('lodash');
const CONFIG = require('../config');

const verifyJwt = (req, res, next) => {
  const token = _.get(req, 'headers.x-access-token', null);
  if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

  const decodedToken = jwt.verify(token, CONFIG.session_secret);
  if (!decodedToken) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

  req.userId = decodedToken.id;
  return next();
};

const createJwt = id => jwt.sign({ id }, CONFIG.session_secret, { expiresIn: 50000 });

module.exports = {
  createJwt,
  verifyJwt,
};
