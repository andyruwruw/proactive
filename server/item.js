const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");

// Configure multer so that it will upload to '/public/images'

const users = require("./users.js");
const User = users.model;

const itemSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },

    title: String,
    description: String,

    done: Boolean,

    due: Date,

    subitems: [],

    group: Number,
    priority: Number,
    index: Number,

    created: {
      type: Date,
      default: Date.now
    },
  });
  
  const Item = mongoose.model('Item', itemSchema);

  // post item
router.post("/", auth.verifyToken, User.verify, async (req, res) => {
  console.log("Creating Item");
  console.log(req.body.title);
  console.log(req.body);
    const item = new Item({
      user: req.user,

      title: req.body.title,
      description: req.body.description,

      done: false,

      group: req.body.group,
      priority: req.body.priority,
      index: req.body.index,

      due: req.body.due,

      subitems: req.body.subitems,
    });
    try {
      await item.save();
      let items = await Item.find({
        user: req.user
      }).sort({
        index: 1
      });
      console.log("Sending back items.");
      return res.send(items);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

  // get my items
  router.get("/", auth.verifyToken, User.verify, async (req, res) => {
    try {
      console.log("sending ITEMS");
      let items = await Item.find({
        user: req.user
      }).sort({
        index: 1
      });
      return res.send(items);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

router.get("/:_id", auth.verifyToken, User.verify, async (req, res) => {
    try {
      let item = await Item.findOne({
        _id: req.params._id
      });
      return res.send(item);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

  // Updates based on ID then sends back total Items.
router.put("/:_id", auth.verifyToken, User.verify, async (req, res) => {
    try {
        let item = await Item.updateOne({
          _id: req.params._id
        },
        {
          $set: {
              "title": req.body.title,
              "description": req.body.description,
              "done": req.body.done,
              "due": req.body.due,
              "subitems": req.body.subitems,
              "group": req.body.group,
              "priority": req.body.priority,
              "index": req.body.index,
          }
        });
        let items = await Item.find({
          user: req.user
        }).sort({
          index: 1
        });
        return res.send(items);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

router.put("/index/:_id", auth.verifyToken, User.verify, async (req, res) => {
  try {
      let item = await Item.updateOne({
        _id: req.params._id
      },
      {
        $set: {
            "index": req.body.index,
        }
      });
      let items = await Item.find({
        user: req.user
      }).sort({
        index: 1
      });
      return res.send(items);
  } catch (error) {
      console.log(error);
      return res.sendStatus(500);
  }
});

router.put("/group/:_id", auth.verifyToken, User.verify, async (req, res) => {
  try {
      let item = await Item.updateOne({
        _id: req.params._id
      },
      {
        $set: {
            "group": req.body.group,
        }
      });
      let items = await Item.find({
        user: req.user
      }).sort({
        index: 1
      });
      return res.send(items);
  } catch (error) {
      console.log(error);
      return res.sendStatus(500);
  }
});

// Updates one item for being complete then sends back total Items.
router.put("/done/:_id", auth.verifyToken, User.verify, async (req, res) => {
  try {
      let item = await Item.updateOne({
      _id: req.params._id,
      user: req.user
      },
      {
          $set: {
              "done": req.body.done,
          }
      });
      let items = await Item.find({
        user: req.user
      }).sort({
        index: 1
      });
      return res.send(items);
  } catch (error) {
      console.log(error);
      return res.sendStatus(500);
  }
});

router.delete("/:_id", auth.verifyToken, User.verify, async (req, res) => {
    try {
        await Item.deleteOne({
            _id: req.params._id
        });
        let items = await Item.find({
          user: req.user
        }).sort({
          index: 1
        });
        return res.send(items);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

  module.exports = {
    model: Item,
    routes: router,
  }