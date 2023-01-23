const express = require("express");
const router = express.Router();

const Chats = require("../database/models/Chat");

router.post("/", function (req, res) {
  Chats.findOne(req.body, function (err, docs) {
    if (!err) {
      res.send(docs);
    } else {
      throw err;
    }
  });
});

router.post("/match", (req, res) => {
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

module.exports = router;
