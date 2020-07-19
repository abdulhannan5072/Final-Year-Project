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
    team: [
      {
        username:{
          type: String,
          require: true
        },
        userId:{
          type: mongoose.Schema.Types.ObjectId,
          require: true,
          ref: "User"
        },
        role:{
          type: String,
          require: true,
          default: '-1'
        }
      }
    ]
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
module.exports = { Project };
