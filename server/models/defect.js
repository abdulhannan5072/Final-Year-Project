const mongoose = require("mongoose");

const defectSchema = mongoose.Schema({
  defect: {
    type: String,
    require: true,
    trim: true,
    unique: 1,
  },
  defectType: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  assignTo: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
  priority: {
    type: String,
    require: true,
  },
  os: {
    type: String,
    require: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    require: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
  selectBuild: {
    type: String,
    require: true,
  },
  selectModule: {
    type: String,
    require: true,
  },
});

const Defect = mongoose.model("Defect", defectSchema);
module.exports = { Defect };
