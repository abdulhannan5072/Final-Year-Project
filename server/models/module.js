const mongoose = require("mongoose");

const moduleschema = mongoose.Schema(
  {
    module: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Users",
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Module = mongoose.model("Module", moduleschema);
module.exports = { Module };
