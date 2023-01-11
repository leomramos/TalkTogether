const express = require("express");
const router = express.Router();

const Country = require("../database/models/Country");

router.post("/", (req, res) => {
  Country.find({}, function (err, docs) {
    if (!err) {
      res.send(docs);
    } else {
      throw err;
    }
  }).sort("name");
});

module.exports = router;
