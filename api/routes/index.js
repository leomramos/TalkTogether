const auth = require("./auth");
const users = require("./users");

module.exports = app => {
  app.use((req, res, next) => {
    console.log("Time: ", Date.now());
    next();
  });
  app.use("/users", users);
  app.use("/auth", auth);
};
