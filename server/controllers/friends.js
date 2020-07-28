const { User } = require("../models/users");
const io = require("../server");

exports.sendFriendRequest = (req, res, next) => {
  const { requestSender, requestReciver } = req.body;
  const requestSenderEmail = requestSender.email;
  // let reqReciver;
  // let reqSender;

  User.findUser(requestReciver, (err, reqReciver) => {
    if (err) return res.status(400).send(err);
    if (!reqReciver)
      return res.status(200).json({
        message: "User not found",
      });
    // find in friends
    User.findInFriendList(
      { requestSenderEmail, requestReciver: reqReciver.username },
      (err, doc) => {
        if (err) return res.status(400).send(err);
        if (doc) {
          return res.status(200).json({
            message: "User is already your friend",
          });
        } else {
          // find in Pending requests
          User.findInPendingRequests(
            { requestSenderEmail, requestReciver: reqReciver.username },
            (err, doc) => {
              if (err) return res.status(400).send(err);
              if (doc) {
                return res.status(200).json({
                  message: "User is in your pending request",
                });
              } else {
                // find in sendRequest
                User.findInSendRequest(
                  { requestSenderEmail, requestReciver: reqReciver.username },
                  (err, doc) => {
                    if (err) return res.status(400).send(err);
                    if (doc) {
                      console.log(io);
                      // io.emit('friends', {message:"hwllo"})
                      return res.status(200).json({
                        message: "You already send a request",
                      });
                    } else {
                      //saving request in database
                      const updatedRequest = {
                        requests: {
                          userId: requestSender.userId,
                          username: requestSender.username,
                          name: requestSender.name,
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
                          name: reqReciver.name,
                        },
                      };

                      User.findByIdAndUpdate(
                        requestSender.userId,
                        { $push: updatedSendRequest },
                        { new: true, useFindAndModify: false },
                        (err, doc) => {
                          if (err) return res.status(400).send(err);
                          // io.getIo().emit("friend", { message: "Request send" });
                          res.status(200).json({
                            message: "Friend request sent",
                          });
                        }
                      );
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  });
};

/// if friend request accepted

exports.friendRequestAccepted = (req, res) => {
  const { accepter, requester } = req.body;
  const accepterEmail = accepter.email;
  User.findOne({ username: requester }, (err, requesterData) => {
    if (err) return res.status(400).send(err);
    if (!requesterData) {
      return res.status(200).json({
        message: "User not found",
      });
    } else {
      const requestSenderEmail = requesterData.email;
      // find in friends
      User.findInFriendList(
        { requestSenderEmail, requestReciver: accepter.username },
        (err, doc) => {
          if (err) return res.status(400).send(err);
          if (doc) {
            return res.status(200).json({
              message: "User is already your friend",
            });
          } else {
            // Removing from requests and updating friends
            const updatingRequests = {
              requests: {
                userId: requesterData._id,
                username: requesterData.username,
                name: requesterData.name,
              },
            };
            const updatingFriendsList = {
              friendsList: {
                friendId: requesterData._id,
                friendUsername: requesterData.username,
                name: requesterData.name,
              },
            };

            User.findOneAndUpdate(
              { email: accepterEmail },
              { $pull: updatingRequests, $push: updatingFriendsList },
              { new: true, useFindAndModify: false },
              (err, doc) => {
                if (err) return res.status(400).send(err);
                if (doc) {
                  // removing from send request and updating friends
                  const updatingSendRequests = {
                    sendRequests: {
                      username: accepter.username,
                      name: accepter.name,
                    },
                  };
                  const updatingFriendsList = {
                    friendsList: {
                      friendId: accepter.userId,
                      friendUsername: accepter.username,
                      name: accepter.name,
                    },
                  };

                  User.findOneAndUpdate(
                    { email: requesterData.email },
                    { $pull: updatingSendRequests, $push: updatingFriendsList },
                    { new: true, useFindAndModify: false },
                    (err, doc) => {
                      if (err) return res.status(400).send(err);
                      res.status(200).json({
                        message: "You are friends now",
                      });
                    }
                  );
                }
              }
            );
          }
        }
      );
    }
  });
};
