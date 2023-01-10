require("./database");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const User = require("./database/models/User");

const app = express();

app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

require("./routes")(app);

app.get("/", (req, res, next) => {
  User.deleteOne({ email: "teste@teste.com" }, (err, user) => {
    if (!err) {
      console.log(user);
    } else {
      throw err;
    }
  });
  // User.find({}, function (err, docs) {
  //   if (!err) {
  //     console.log(docs);
  //   } else {
  //     throw err;
  //   }
  // });
  res.json({ msg: "This is CORS-enabled for all origins!" });
});

app.post("/", (req, res, next) => {
  res.json({ msg: "This is CORS-enabled for all origins!" });
});

app.listen(3000, () => {
  console.log("CORS-enabled web server listening on port 3000");
});
