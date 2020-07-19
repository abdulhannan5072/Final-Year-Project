const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    projectName: {
      type: String,
      require: true,
      trim: true,
      unique: 1,
    },
    projectType: {
      type: String,
      require: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
module.exports = { Project };
