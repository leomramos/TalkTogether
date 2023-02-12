const express = require("express");
const router = express.Router();
const { Types } = require("mongoose");

const Chats = require("../database/models/Chat");

router.post("/", function (req, res) {
  const chatId = req.body.chatId;
  Chats.aggregate([{ $match: { $expr: { _id: { $eq: ["$_id", chatId] } } } }])
    .lookup({
      from: "profiles",
      localField: "users",
      foreignField: "userId",
      as: "profiles",
    })
    .unwind("$profiles")
    .lookup({
      from: "countries",
      localField: "profiles.country",
      foreignField: "_id",
      as: "profiles.country",
    })
    .group({
      _id: "$_id",
      messages: { $first: "$messages" },
      users: { $first: "$users" },
      permissions: { $first: "$permissions" },
      profiles: { $push: "$profiles" },
    })
    .project({
      profiles: { rating: 0 },
    })
    .then(function (docs) {
      res.send(docs[0]);
    })
    .catch(function (err) {
      throw err;
    });
});

router.post("/list", function (req, res) {
  const userId = req.body.userId;
  Chats.aggregate([
    {
      $match: {
        $expr: {
          $in: [Types.ObjectId(userId), "$users"],
        },
      },
    },
  ])
    .lookup({
      from: "profiles",
      localField: "users",
      foreignField: "userId",
      as: "profiles",
    })
    .project({
      profiles: { rating: 0 },
      permissions: 0,
    })
    .then(function (docs) {
      res.send(docs);
    })
    .catch(function (err) {
      throw err;
    });
});

router.post("/match", function (req, res) {
  Chats.findOne(
    {
      ...req.body,
      users: {
        $all: req.body.users,
      },
    },
    function (err, chat) {
      if (!err) {
        if (chat) res.send(chat);
        else {
          Chats.create(req.body, function (err, newChat) {
            if (!err) {
              Chats.findOne(newChat, function (err, newChat) {
                if (!err) {
                  res.send(newChat);
                } else {
                  throw err;
                }
              });
            } else {
              throw err;
            }
          });
        }
      } else {
        throw err;
      }
    }
  );
});

router.post("/message", function (req, res) {
  const chatId = req.body.chatId;
  const msg = req.body.msg;

  Chats.updateOne(
    { _id: chatId },
    { $push: { messages: msg } },
    function (err, chat) {
      if (!err) {
        res.send(chat);
      } else {
        throw err;
      }
    }
  );
});

module.exports = router;
