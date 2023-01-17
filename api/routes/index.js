const auth = require("./auth");
const countries = require("./countries");
const languages = require("./languages");
const profiles = require("./profiles");
const users = require("./users");

module.exports = app => {
  app.use((req, res, next) => {
    console.log("Time: ", Date.now());
    next();
  });
  app.use("/auth", auth);
  app.use("/countries", countries);
  app.use("/languages", languages);
  app.use("/profiles", profiles);
  app.use("/users", users);
};
