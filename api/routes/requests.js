const express = require("express");
const router = express.Router();
const { Types } = require("mongoose");

const Requests = require("../database/models/Request");

router.post("/search", (req, res) => {
  Requests.find(req.body, function (err, docs) {
    if (!err) {
      res.send(docs);
    } else {
      throw err;
    }
  });
});

router.post("/create", (req, res) => {
  Requests.create(req.body, function (err, docs) {
    if (!err) {
      res.send(docs);
    } else {
      throw err;
    }
  });
});

router.post("/remove", (req, res) => {
  Requests.deleteOne(req.body, function (err, docs) {
    if (!err) {
      res.send(docs);
    } else {
      throw err;
    }
  });
});

module.exports = router;
