const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../database/models/User");

router.post("/search", (req, res) => {
  User.find(req.body, function (err, docs) {
    if (!err) {
      res.send(docs[0]);
    } else {
      throw err;
    }
  });
});

router.put("/register", (req, res) => {
  const data = req.body;
  data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10));
  User.create(data, function (err, small) {
    if (!err) {
      User.find(small, function (err, docs) {
        if (!err) {
          res.send(docs[0]);
        } else {
          throw err;
        }
      });
    } else {
      throw err;
    }
  });
});

module.exports = router;
