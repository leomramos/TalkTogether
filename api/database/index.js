const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose
  .connect("mongodb://127.0.0.1:27017/talk_together")
  .then(() => console.log("Database connection established"))
  .catch(e => console.error(e));

mongoose.Promise = global.Promise;

module.exports = mongoose;
