const db = require("mongoose");

const RoleSchema = new db.Schema(
  {
    label: { type: String, required: true, unique: true },
    permLevel: { type: Number, required: true, unique: true },
  },
  { timestamps: true }
);

const Role = db.model("Role", RoleSchema);

module.exports = Role;
