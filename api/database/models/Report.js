const db = require("mongoose");

const ReportSchema = new db.Schema(
  {
    by: { type: "ObjectId", required: true },
    user: { type: "ObjectId", required: true },
  },
  { timestamps: true }
);

const Report = db.model("Report", ReportSchema);

module.exports = Report;
