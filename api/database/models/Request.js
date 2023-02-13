const db = require("mongoose");

const RequestSchema = new db.Schema(
  {
    action: { type: String, required: true },
    requester: { type: "ObjectId", required: true, ref: "User" },
    target: { type: "ObjectId", required: true, ref: "User" },
  },
  { timestamps: true }
);

const Request = db.model("Request", RequestSchema);

module.exports = Request;
