const db = require("mongoose");

const ChatSchema = new db.Schema(
  {
    users: [{ type: "ObjectId" }],
    messages: [
      {
        from: { type: "ObjectId" },
        body: { type: String },
        type: { type: String },
        sent: { type: Date },
        refersTo: { type: "ObjectId" },
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
