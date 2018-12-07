const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = require('mongoose');

const user = new Schema({
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  nickname: { type: String, required: true, index: { unique: true } },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  following: [{ type: String }],
});

user.methods.generateHash = pass => bcrypt.hashSync(pass, bcrypt.genSaltSync(8), null);

user.methods.validPassword = (pass, hash) => ((pass) ? bcrypt.compareSync(pass, hash) : false);

module.exports = mongoose.model('User', user);
