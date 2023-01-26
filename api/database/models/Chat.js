const db = require("mongoose");

const ChatSchema = new db.Schema(
  {
    users: [{ type: "ObjectId", ref: "User" }],
    messages: [
      {
        from: { type: "ObjectId", ref: "User" },
        body: { type: String },
        type: { type: String },
        sent: { type: Date },
        refersTo: { type: "ObjectId", ref: "User" },
      },
    ],
    permissions: {
      documents: { type: String, required: true, default: "disabled" },
      audio: { type: String, required: true, default: "disabled" },
      media: { type: String, required: true, default: "disabled" },
    },
  },
  { timestamps: true }
);

const Chat = db.model("Chat", ChatSchema);

module.exports = Chat;
