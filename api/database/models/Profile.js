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
        languageId: { type: "ObjectId", required: true },
        proficiency: { type: Number, required: true },
      },
    ],
    rating: {
      total: Number,
      amount: Number,
      history: [
        {
          ratedBy: { type: "ObjectId", required: true },
          rating: { type: Number, required: true },
        },
      ],
    },
  },
  { timestamps: true }
);

const Profile = db.model("Profile", ProfileSchema);

module.exports = Profile;
