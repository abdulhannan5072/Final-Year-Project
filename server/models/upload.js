const mongoose = require("mongoose");

const Uploadschema = mongoose.Schema({
  fileName: {
    type: String,
    require: true,
  },
  url: {
    type: String,
    require: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'Users',
    require: true,
  },
});

const Upload = mongoose.model("Upload", Uploadschema);
module.exports = Upload;
