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

user.methods.generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

user.methods.validPassword = password => bcrypt.compareSync(password, this.password);

module.exports = mongoose.model('User', user);
