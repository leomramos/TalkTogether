const express = require("express");
const router = express.Router();

const Profile = require("../database/models/Profile");

router.post("/save", (req, res) => {
  const prof = {};
  Object.keys(Profile.schema.tree).forEach(
    field => (prof[field] = req.body.data[field])
  );
  console.log(req.body.data);
  Profile.findByIdAndUpdate(req.body.data._id, prof, function (err, docs) {
    if (!err) {
      Profile.findById(req.body.data._id, function (err, docs) {
        console.log(docs);
        res.status(200).send();
      });
    } else {
      throw err;
    }
  });
});

module.exports = router;
