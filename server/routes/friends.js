const routes = require("express").Router();
const { User } = require("../models/users");
const { sendFriendRequest } = require("../controllers/friends");

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

module.exports = routes;
