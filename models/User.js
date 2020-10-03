const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { removeOldTokens } = require('../utils/auth');

const {
  SALT_ROUNDS,
} = process.env;

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [],
});

schema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const hash = await bcrypt.hashSync(this.password, parseInt(SALT_ROUNDS));

    this.password = hash;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

schema.methods.comparePassword = async function(password) {
  try {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
  } catch (error) {
    return false;
  }
};

schema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.password;
  delete obj.tokens;
  return obj;
}

schema.methods.addToken = function(token) {
  this.tokens.push(token);
}

schema.methods.removeToken = function(token) {
  this.tokens = this.tokens.filter(t => t != token);
}

schema.methods.removeOldTokens = function() {
  this.tokens = removeOldTokens(this.tokens);
}

export const User = mongoose.model('User', schema);
