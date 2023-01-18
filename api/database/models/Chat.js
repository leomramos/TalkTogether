const db = require("mongoose");

const ChatSchema = new db.Schema(
  {
    users: [{ type: "ObjectId" }],
    messages: [
      {
        from: { type: "ObjectId", required: true },
        body: { type: String, required: true },
        type: { type: String, required: true },
        sent: { type: Date, required: true },
        refersTo: { type: "ObjectId" },
      },
    ],
    permissions: {
      documents: { type: String, required: true },
      audio: { type: String, required: true },
      media: { type: Date, required: true },
    },
  },
  { timestamps: true }
);

const Chat = db.model("Chat", ChatSchema);

module.exports = Chat;
