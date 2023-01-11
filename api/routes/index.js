const auth = require("./auth");
const countries = require("./countries");
const users = require("./users");

module.exports = app => {
  app.use((req, res, next) => {
    console.log("Time: ", Date.now());
    next();
  });
  app.use("/auth", auth);
  app.use("/countries", countries);
  app.use("/users", users);
};
