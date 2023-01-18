const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../database/models/User");

router.post("/login", (req, res) => {
  console.log(req.body);
  User.findOne({ email: req.body.email }, function (err, user) {
    if (!err) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send(user);
      } else {
        res.send(false);
      }
    } else {
      throw err;
    }
  }).select("+password +email");
});

module.exports = router;
