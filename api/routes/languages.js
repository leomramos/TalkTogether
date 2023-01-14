const express = require("express");
const router = express.Router();

const Language = require("../database/models/Language");

router.post("/", (req, res) => {
  Language.find({}, function (err, docs) {
    if (!err) {
      res.send(docs);
    } else {
      throw err;
    }
  }).sort("name");
});

module.exports = router;
