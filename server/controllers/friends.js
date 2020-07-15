const { User } = require("../models/users");

exports.sendFriendRequest = (req, res, next) => {
  const { requestSender, requestReciver } = req.body;

  let reqReciver;
  let reqSender;

  User.findUser(requestReciver, (err, doc) => {
    if (err) return res.status(400).send(err);
    if (!doc)
      return res.status(200).json({
        message: "User not found",
      });
    reqReciver = doc;
  });

  User.findUser(requestSender, (err, doc) => {
    if (err) return res.status(400).send(err);
    if (!doc)
      return res.status(200).json({
        message: "User not found",
      });
    reqSender = doc;
  });

  User.findInFriendList(
    { requestSender, requestReciver: reqReciver.username },
    (err, doc) => {
      if (err) return res.status(400).send(err);
      if (doc)
        return res.status(200).json({
          message: "User is already your friend",
        });
    }
  );

  User.findInPendingRequests(
    { requestSender, requestReciver: reqReciver.username },
    (err, doc) => {
      if (err) return res.status(400).send(err);
      if (doc)
        return res.status(200).json({
          message: "User is in your pending request",
        });
    }
  );

  User.findInSendRequest(
    { requestSender, requestReciver: reqReciver.username },
    (err, doc) => {
      if (err) return res.status(400).send(err);
      if (doc)
        return res.status(200).json({
          message: "You already send a request",
        });
    }
  );

  //sending request

  const updatedRequest = {
    requests: {
      userId: reqSender._id,
      username: reqSender.username,
    },
  };

  User.findByIdAndUpdate(
    reqReciver._id,
    { $push: updatedRequest },
    { new: true, useFindAndModify: false },
    (err, doc) => {
      if (err) return res.status(400).send(err);
    }
  );

  const updatedSendRequest = {
    sendRequests: {
      username: reqReciver.username,
    },
  };

  User.findByIdAndUpdate(
    reqSender._id,
    { $push: updatedSendRequest },
    { new: true, useFindAndModify: false },
    (err, doc) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({
        message: "Friend request sent",
      });
    }
  );
};
