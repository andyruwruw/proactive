const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { removeOldTokens } = require('../utils/auth');

const {
  SERVER_SECRET
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
  name: {
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
    const salt = await bcrypt.genSalt(SERVER_SECRET);
    const hash = await bcrypt.hash(this.password, salt);

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

// // middleware to validate user account
// schema.statics.verify = async function(req, res, next) {
//   // look up user account
//   const user = await User.findOne({
//     _id: req.user_id
//   });
//   if (!user || !user.tokens.includes(req.token))
//     return res.clearCookie('token').status(403).send({
//       error: "Invalid user account."
//     });

//   req.user = user;

//   next();
// }

const User = mongoose.model('User', schema);
export default User;