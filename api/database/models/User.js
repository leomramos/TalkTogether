const db = require("mongoose");

const UserSchema = new db.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    birthday: { type: Date, required: true },
    language: { type: "ObjectId", required: true },
    role: { type: "ObjectId" },
  },
  { timestamps: true }
);

const User = db.model("User", UserSchema);

module.exports = User;
