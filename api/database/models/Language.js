const db = require("mongoose");

const LanguageSchema = new db.Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    nativeName: { type: String, required: true },
  },
  { timestamps: true }
);

const Language = db.model("Language", LanguageSchema);

module.exports = Language;
