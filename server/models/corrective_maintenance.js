const mongoose = require("mongoose");

const correctivemaintenanceSchema = new mongoose.Schema(
  {
    build: {
      type: String,
      require: true,
    },
    module: {
      type: String,
      require: true,
    },
    faultType: {
      type: String,
      require: true,
    },
    fault: {
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
  {
    timestamps: true,
  }
);
const CorrectiveMaintenance = mongoose.model(
  "CorrectiveMaintenance",
  correctivemaintenanceSchema
);
module.exports = { CorrectiveMaintenance };
