const express = require("express");
const router = express.Router();

const Profile = require("../database/models/Profile");

router.post("/", (req, res) => {
  Profile.findOne(req.body, function (err, docs) {
    if (!err) {
      res.send(docs);
    } else {
      throw err;
    }
  });
});

router.post("/save", (req, res) => {
  Profile.findByIdAndUpdate(
    req.body.data._id,
    req.body.data,
    function (err, docs) {
      if (!err) {
        Profile.findById(req.body.data._id, function (err, docs) {
          console.log(docs);
          res.status(200).send();
        });
      } else {
        throw err;
      }
    }
  );
});

module.exports = router;
