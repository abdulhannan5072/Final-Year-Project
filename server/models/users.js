const mongoose = require("mongoose");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config").get(process.env.NODE_ENV);
const SALT_I = 10;

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      trim: true,
      unique: 1,
    },
    name: {
      type: String,
      require: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
      minlength: 8,
    },
    username: {
      type: String,
      require: true,
      trim: true,
      unique: 1,
    },
    role: {
      type: Number,
      default: 0,
    },
    token: {
      type: String,
    },
    sendRequests: [
      {
        username: { type: String, default: "" },
        name: {type: String}
      },
    ],
    requests: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        username: { type: String, default: "" },
        name: {type: String}
      },
    ],
    friendsList: [
      {
        friendId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        friendUsername: { type: String, default: "" },
        name: {type: String}
      },
    ],
    totalRequest: { type: Number, default: 0 },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  var user = this;

  if (user.isModified("password")) {
    bycrypt.genSalt(SALT_I, (err, salt) => {
      if (err) return next(err);

      bycrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);

        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparingPassword = function (pass, callback) {
  bycrypt.compare(pass, this.password, function (err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

userSchema.methods.generateToken = function (callback) {
  var user = this;
  var token = jwt.sign(user._id.toHexString(), config.SECRET);
  user.token = token;

  user.save((err, user) => {
    if (err) return callback(err);
    callback(null, user);
  });
};

userSchema.statics.findByToken = function (token, callback) {
  var user = this;

  jwt.verify(token, config.SECRET, function (err, decode) {
    user.findOne({ _id: decode, token: token }, function (err, user) {
      if (err) return callback(err);
      callback(null, user);
    });
  });
};

userSchema.methods.deleteToken = function (token, callback) {
  var user = this;

  user.update({ $unset: { token: 1 } }, (err, user) => {
    if (err) return callback(err);
    callback(null, user);
  });
};

// find user

userSchema.statics.findUser = function (email, callback) {
  var user = this;

  user.findOne({ email: email }, (err, doc) => {
    if (err) return callback(err);
    if (!doc) return callback(null, false);
    callback(null, doc);
  });
};

// find in friends

userSchema.statics.findInFriendList = function (data, callback) {
  var user = this;
  user.findOne({ email: data.requestSenderEmail }, (err, doc) => {
    if (err) return callback(err);
    // console.log(doc);
    if (doc.friendsList != null) {
      const findFriend = doc.friendsList.find(
        (obj) => obj.friendUsername === data.requestReciver
      );
      if (findFriend) {
        return callback(null, true);
      }
    }

    callback(null, false);
  });
};

// find in Pending requests

userSchema.statics.findInPendingRequests = function (data, callback) {
  var user = this;
  user.findOne({ email: data.requestSenderEmail }, (err, doc) => {
    if (err) return callback(err);
    if (doc.requests != null) {
      const findUser = doc.requests.find(
        (obj) => obj.username === data.requestReciver
      );
      if (findUser) {
        return callback(null, true);
      }
    }

    callback(null, false);
  });
};

// find in sendRequest

userSchema.statics.findInSendRequest = function (data, callback) {
  var user = this;
  user.findOne({ email: data.requestSenderEmail }, (err, doc) => {
    if (err) return callback(err);
    if (doc.sendRequests != null) {
      const findUser = doc.sendRequests.find(
        (obj) => obj.username === data.requestReciver
      );
      if (findUser) {
        return callback(null, true);
      }
    }

    callback(null, false);
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
