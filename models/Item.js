const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },

  title: {
    type: String,
    default: 'Nameless Task',
  },
  description: {
    type: String,
    default: '',
  },

  done: {
    type: Boolean,
    default: false,
  },

  due: {
    type: Date,
    default: null,
  },

  subitems: [],

  group: {
    type: Number,
    default: 0,
  },
  priority: {
    type: Number,
    default: 0,
  },
  index: {
    type: Number,
    default: 0,
  },

  created: {
    type: Date,
    default: Date.now
  },
});

const Item = mongoose.model('Item', schema);
export default Item;