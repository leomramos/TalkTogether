const http = require("https");

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose
  .connect("mongodb://127.0.0.1:27017/talk_together")
  .then(() => console.log("Database connection established"))
  .catch(e => console.error(e));

mongoose.Promise = global.Promise;

const Country = require("../database/models/Country");

const url = "https://restcountries.com/v3.1/all";

http.get(url, res => {
  let rawData = "";

  res.on("data", chunk => {
    rawData += chunk;
  });

  res.on("end", () => {
    const parsedData = JSON.parse(rawData);
    const total = parsedData.length;

    parsedData.forEach((country, index) => {
      const flagPath = country.flags.svg;

      Country.create(
        {
          code: country.cca2,
          name: country.name.common,
          flagPath,
        },
        function (err, small) {
          if (!err) {
            console.log(`${index + 1}/${total} - ${small}`);
          } else {
            throw err;
          }
        }
      );
    });
  });
});
