require("./database");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
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

app.listen(3000, () => {
  console.log("CORS-enabled web server listening on port 3000");
});

module.exports = require("./sockets")(app);
