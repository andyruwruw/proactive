const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");

// Configure multer so that it will upload to '/public/images'

const users = require("./users.js");
const User = users.model;

const preferencesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },

    labels: [],
    colors: Number,
    display: Number,
    theme: Number,
    groups: [],
    order: Number,
    sound_pack: Number,
    music: Number,
    svolume: Number,
    mvolume: Number,
  });
  
const Preferences = mongoose.model('Preferences', preferencesSchema);

  // post item
router.post("/", auth.verifyToken, User.verify, async (req, res) => {
  console.log(req.user);
    const preferences = new Preferences({
      user: req.user,
      labels: [true, true, true],
      colors: 0,
      display: 0,
      theme: 0,
      groups: [],
      order: 0,
      sound_pack: 1,
      music: 0,
      svolume: 1,
      mvolume: 1,
    });
    try {
      await preferences.save();
      return res.send(preferences);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

  // get my items
  router.get("/", auth.verifyToken, User.verify, async (req, res) => {
    try {
      let preferences = await Preferences.findOne({
        user: req.user
      });
      return res.send(preferences);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });


router.put("/", auth.verifyToken, User.verify, async (req, res) => {
    try {
        await Preferences.updateOne({
            user: req.user
        },
        {
            $set: {
                "labels": req.body.labels,
                "colors": req.body.colors,
                "display": req.body.display,
                "theme": req.body.theme,
                "groups": req.body.groups,
                "order": req.body.order,
                "sound_pack": req.body.sound_pack,
                "music": req.body.music,
                "svolume": req.body.svolume,
                "mvolume": req.body.mvolume,
            }
        });
        let send = await Preferences.findOne({
          user: req.user
        })
        return res.send(send);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

router.put("/reset", auth.verifyToken, User.verify, async (req, res) => {
    try {
        let preferences = await Preferences.updateOne({
            user: req.user
        },
        {
            $set: {
                "labels": [true, true, true],
                "colors": 0,
                "display": 0,
                "theme": 0,
                "groups": [],
                "order": 0,
                "sound_pack": 1,
                "music": 0,
                "svolume": 1,
                "mvolume": 1,
            }
        });
        let send = await Preferences.findOne({
          user: req.user
        })
        return res.send(send);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

  module.exports = {
    model: Preferences,
    routes: router,
  }