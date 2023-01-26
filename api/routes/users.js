const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../database/models/User");
const Language = require("../database/models/Language");
const Profile = require("../database/models/Profile");

router.post("/search", (req, res) => {
  User.findOne(req.body)
    .populate("role")
    .exec(function (err, docs) {
      if (!err) {
        res.send(docs);
      } else {
        throw err;
      }
    });
});

router.put("/register", (req, res) => {
  const data = req.body;
  data.user.password = bcrypt.hashSync(
    data.user.password,
    bcrypt.genSaltSync(10)
  );

  Language.findOne({ code: data.user.language }, "_id", function (err, small) {
    if (!err) {
      data.user.language = small._id;

      User.create(data.user, function (err, small) {
        if (!err) {
          Profile.create(
            {
              userId: small._id,
              country: data.country,
            },
            function (err, profile) {
              if (!err) {
                User.findOne({ _id: profile.userId })
                  .populate("role")
                  .exec(function (err, docs) {
                    if (!err) {
                      res.send(docs);
                    } else {
                      throw err;
                    }
                  });
              } else {
                throw err;
              }
            }
          );
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
