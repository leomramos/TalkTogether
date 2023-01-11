const http = require("https");

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose
  .connect("mongodb://127.0.0.1:27017/talk_together")
  .then(() => console.log("Database connection established"))
  .catch(e => console.error(e));

mongoose.Promise = global.Promise;

const Language = require("../database/models/Language");

const url =
  "https://gist.githubusercontent.com/piraveen/fafd0d984b2236e809d03a0e306c8a4d/raw/4258894f85de7752b78537a4aa66e027090c27ad/languages.json";

http.get(url, res => {
  let rawData = "";

  res.on("data", chunk => {
    rawData += chunk;
  });

  res.on("end", () => {
    const parsedData = Object.entries(JSON.parse(rawData));
    const total = parsedData.length;

    parsedData.forEach((item, index) => {
      const code = item[0];

      if (code === "iw") return;

      const weirdName = item[1].name.split(",")[0];

      let name = weirdName.split(" ");

      for (let i = 0; i < name.length; i++) {
        name[i] = name[i][0].toUpperCase() + name[i].substr(1);
      }

      name = name.join(" ");

      const weirdNatName = item[1].nativeName.split(",")[0];

      let nativeName = "Unknown";

      if (weirdNatName) {
        nativeName = weirdNatName.split(" ");

        for (let i = 0; i < nativeName.length; i++) {
          nativeName[i] =
            nativeName[i][0].toUpperCase() + nativeName[i].substr(1);
        }

        nativeName = nativeName.join(" ");
      }

      Language.create(
        {
          code,
          name,
          nativeName,
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
