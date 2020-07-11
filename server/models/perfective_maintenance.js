const mongoose = require("mongoose");

const perfectivemaintenanceSchema = mongoose.Schema(
  {
    functionalityType: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    requirements: {
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

const PerfectiveMaintenance = mongoose.model(
  "PerfectiveMaintenance",
  perfectivemaintenanceSchema
);
module.exports = { PerfectiveMaintenance };
