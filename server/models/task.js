const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    taskName: {
      type: String,
      require: true,
      trim: true,
      unique: 1,
    },
    status: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    attachmentUrl: {
      type: String,
    },
    assignTo: {
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
      ref: "Users",
    },
    startDate: {
      type: String,
      require: true,
    },
    dueDate: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
const Task = mongoose.model("Task", taskSchema);
module.exports = { Task };
