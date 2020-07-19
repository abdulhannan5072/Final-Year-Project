const routes = require("express").Router();
const { User } = require("../models/users");
const {
  sendFriendRequest,
  friendRequestAccepted,
} = require("../controllers/friends");



routes.get("/search/users", function (req, res) {
  User.findInFriendList(
    {
      requestSender: req.body.requestSender,
      requestReciver: req.body.requestReciver,
    },
    (err, doc) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(doc);
    }
  );
});

// add friend

routes.post("/sendFriendRequest", sendFriendRequest);

routes.post("/friendRequestAccepted", friendRequestAccepted);

//get requests
routes.get("/getFriendRequests/:id", (req, res) => {
  User.findById(req.params.id, (err, doc) => {
    if (err) return res.status(400).send(err);
    if (!doc)
      return res.status(200).json({
        message: "User not found",
      });
    const requests = doc.requests;
    res.status(201).json({
      requests,
    });
  });
});

// get friends list

routes.get("/getFriendsList/:id", (req, res) => {
  User.findById(req.params.id, (err, doc) => {
    if (err) return res.status(400).send(err);
    if (!doc)
      return res.status(200).json({
        message: "user not found",
      });
    res.status(200).json({
      friendsList: doc.friendsList,
    });
  });
});

module.exports = routes;
