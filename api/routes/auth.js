const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../database/models/User");

router.post("/login", (req, res) => {
  User.find({ email: req.body.email }, function (err, docs) {
    if (!err) {
      res.send(
        bcrypt.compareSync(req.body.password, docs[0].password) && docs[0]
      );
    } else {
      throw err;
    }
  }).select("+password");
});

module.exports = router;
