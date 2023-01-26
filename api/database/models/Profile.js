const db = require("mongoose");

const ProfileSchema = new db.Schema(
  {
    userId: { type: "ObjectId", required: true, select: false, ref: "User" },
    name: String,
    avatar: {
      style: { type: Number, required: true, default: 1 },
      color: { type: String, required: true, default: "white" },
    },
    about: String,
    country: { type: "ObjectId", ref: "Country" },
    languages: [
      {
        languageId: { type: "ObjectId", required: true, ref: "Language" },
        proficiency: { type: Number, required: true },
      },
    ],
    rating: {
      total: Number,
      amount: Number,
      history: [
        {
          ratedBy: { type: "ObjectId", ref: "User" },
          rating: Number,
        },
      ],
    },
  },
  { timestamps: true }
);

const Profile = db.model("Profile", ProfileSchema);

module.exports = Profile;
