const express = require("express");
const router = express.Router();
const { Types } = require("mongoose");

const Reports = require("../database/models/Report");

router.post("/new", (req, res) => {
  Reports.create(req.body, function (err, docs) {
    if (!err) {
      res.send(docs);
    } else {
      throw err;
    }
  });
});

router.post("/check", (req, res) => {
  Reports.find(req.body, function (err, docs) {
    if (!err) {
      res.send(docs);
    } else {
      throw err;
    }
  });
});

router.post("/count", (req, res) => {
  Reports.count({ user: Types.ObjectId(req.body.user) }, function (err, count) {
    if (!err) {
      res.send({ count });
    } else {
      throw err;
    }
  });
});

module.exports = router;
