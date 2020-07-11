const mongoose = require("mongoose");

const adaptivemaintenanceSchema = mongoose.Schema(
  {
    type: {
      type: String,
      require: true,
    },
    affected: {
      type: String,
      require: true,
    },
    affectedBy: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    project: {
      type: mongoose.Types.ObjectId,
      ref: "Project",
      require: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  { timestamps: true }
);

const AdaptiveMaintenance = mongoose.model(
  "AdaptiveMaintenance",
  adaptivemaintenanceSchema
);
module.exports = { AdaptiveMaintenance };
