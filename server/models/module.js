const mongoose = require("mongoose");

const moduleschema = mongoose.Schema({
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
  projectKey: {
    type: String,
    require: true,
  },
});

const Module = mongoose.model("Module", moduleschema);
module.exports = { Module };
