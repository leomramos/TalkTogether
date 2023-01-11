const db = require("mongoose");

const CountrySchema = new db.Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    flagPath: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Country = db.model("Country", CountrySchema);

module.exports = Country;
