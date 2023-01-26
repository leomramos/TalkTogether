const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../database/models/User");

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email })
    .select("+password +email")
    .populate("role")
    .exec(function (err, user) {
      if (!err) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          res.send(user);
        } else {
          res.send(false);
        }
      } else {
        throw err;
      }
    });
});

module.exports = router;
