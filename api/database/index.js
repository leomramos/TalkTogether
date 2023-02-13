const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose
  .connect("mongodb://127.0.0.1:27017/talk_together")
  .then(() => console.log("Database connection established"))
  .catch(e => console.error(e));

mongoose.Promise = global.Promise;

require("../database/models/Chat");
require("../database/models/Country");
require("../database/models/Language");
require("../database/models/Profile");
require("../database/models/Report");
require("../database/models/Request");
require("../database/models/Role");
require("../database/models/User");

module.exports = mongoose;
