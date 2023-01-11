const http = require("https");

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose
  .connect("mongodb://127.0.0.1:27017/talk_together")
  .then(() => console.log("Database connection established"))
  .catch(e => console.error(e));

mongoose.Promise = global.Promise;

const Role = require("../database/models/Role");

Role.create(
  {
    label: "User",
    permLevel: 1,
  },
  function (err, small) {
    if (!err) {
      console.log(small);
    } else {
      throw err;
    }
  }
);

Role.create(
  {
    label: "Moderator",
    permLevel: 3,
  },
  function (err, small) {
    if (!err) {
      console.log(small);
    } else {
      throw err;
    }
  }
);

Role.create(
  {
    label: "Administrator",
    permLevel: 5,
  },
  function (err, small) {
    if (!err) {
      console.log(small);
    } else {
      throw err;
    }
  }
);
