const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { Types } = require("mongoose");

const Users = require("../database/models/User");
const Languages = require("../database/models/Language");
const Profiles = require("../database/models/Profile");
const Roles = require("../database/models/Role");
const Chats = require("../database/models/Chat");

router.post("/search", (req, res) => {
  Users.findOne(req.body)
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

  Languages.findOne({ code: data.user.language }, "_id", function (err, small) {
    if (!err) {
      data.user.language = small._id;

      Users.create(data.user, function (err, small) {
        if (!err) {
          Profiles.create(
            {
              userId: small._id,
              country: data.country,
            },
            function (err, profile) {
              if (!err) {
                Users.findOne({ _id: profile.userId })
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

router.post("/promote", (req, res) => {
  Roles.find({})
    .sort("permLevel")
    .exec(function (err, roles) {
      if (!err) {
        Users.findOne(req.body, function (err, docs) {
          if (!err) {
            const role = docs.role
              ? roles[
                  Math.min(
                    roles.findIndex(
                      role => role._id.toString() === docs.role.toString()
                    ) + 1,
                    roles.length - 1
                  )
                ]._id
              : roles[1]._id;
            Users.findByIdAndUpdate(docs._id, { role }, { new: true })
              .populate("role")
              .exec(function (err, updatedUser) {
                if (!err) {
                  res.send(updatedUser);
                } else {
                  throw err;
                }
              });
          } else {
            throw err;
          }
        });
      } else {
        throw err;
      }
    });
});

router.post("/demote", (req, res) => {
  Roles.find({})
    .sort("permLevel")
    .exec(function (err, roles) {
      if (!err) {
        Users.findOne(req.body, function (err, docs) {
          if (!err) {
            const role = docs.role
              ? roles[
                  Math.max(
                    roles.findIndex(
                      role => role._id.toString() === docs.role.toString()
                    ) - 1,
                    0
                  )
                ]._id
              : roles[0]._id;
            Users.findByIdAndUpdate(docs._id, { role }, { new: true })
              .populate("role")
              .exec(function (err, updatedUser) {
                if (!err) {
                  res.send(updatedUser);
                } else {
                  throw err;
                }
              });
          } else {
            throw err;
          }
        });
      } else {
        throw err;
      }
    });
});

router.post("/ban", (req, res) => {
  const userId = req.body._id;
  Users.deleteOne(req.body, function (err, docs) {
    if (!err) {
      Profiles.deleteOne({ userId }, function (err, docs) {
        if (!err) {
          Chats.deleteMany(
            {
              $expr: {
                $in: [Types.ObjectId(userId), "$users"],
              },
            },
            function (err, docs) {
              if (!err) {
                res.send(docs);
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
  // Requests
  // Reports
});

module.exports = router;
