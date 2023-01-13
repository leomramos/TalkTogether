const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../database/models/User");
const Profile = require("../database/models/Profile");

router.post("/login", (req, res) => {
  console.log(req.body);
  User.findOne({ email: req.body.email }, function (err, user) {
    if (!err) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        Profile.findOne({ userId: user._id }, function (err, profile) {
          user.password = undefined;
          if (!err) {
            res.send({ ...user, ...profile }._doc);
          } else {
            throw err;
          }
        }).select("+userId");
      } else {
        res.send(false);
      }
    } else {
      throw err;
    }
  }).select("+password +email");
});

module.exports = router;
