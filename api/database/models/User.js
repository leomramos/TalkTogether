const db = require("mongoose");

const UserSchema = new db.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    birthday: { type: Date, required: true },
    language: { type: "ObjectId", required: true, ref: "Language" },
    role: { type: "ObjectId", ref: "Role" },
  },
  { timestamps: true }
);

const User = db.model("User", UserSchema);

module.exports = User;
