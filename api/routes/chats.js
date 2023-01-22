const express = require("express");
const router = express.Router();

const Chats = require("../database/models/User");

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (!err) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send(user);
      } else {
        res.send(false);
      }
    } else {
      throw err;
    }
  }).select("+password +email");
});

module.exports = router;
