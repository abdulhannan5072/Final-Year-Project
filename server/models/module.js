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
    createdDate: {
      type: String,
      require: true,
    },
    createdBy: {
      type: String,
      require: true,
    },
    project: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Module = mongoose.model("Module", moduleschema);
module.exports = { Module };
