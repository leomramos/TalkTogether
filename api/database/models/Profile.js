const db = require("mongoose");

const ProfileSchema = new db.Schema(
  {
    userId: { type: "ObjectId", required: true, select: false },
    name: String,
    avatar: {
      style: Number,
      color: String,
    },
    about: String,
    country: { type: "ObjectId" },
    languages: [
      {
        languageId: { type: "ObjectId" },
        proficiency: Number,
      },
    ],
    rating: {
      total: Number,
      amount: Number,
      history: [
        {
          ratedBy: { type: "ObjectId" },
          rating: Number,
        },
      ],
    },
  },
  { timestamps: true }
);

const Profile = db.model("Profile", ProfileSchema);

module.exports = Profile;
