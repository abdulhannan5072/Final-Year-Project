const { Project } = require("../models/project");

exports.addUserInProject = (req, res) => {
  const { username, userId, role } = req.body;
  const pid = req.params.pid;
  const team = {
    team: {
      username: username,
      userId: userId,
      role: role,
    },
  };

  Project.findOneAndUpdate(
    { _id: pid },
    { $push: team },
    { new: true, useFindAndModify: false },
    (err, upProject) => {
      if (err) return res.status(400).send(err);
      if (!upProject)
        return res.status(200).json({
          message: "Problem occured: user not added",
        });
      res.status(201).json({
        message: "User added",
        data: upProject,
      });
    }
  );
};

exports.removeUserFromProject = (req, res) => {
  const { username, userId, role } = req.body;
  const pid = req.params.pid;
  const team = {
    team: {
      username: username,
      userId: userId,
      role: role,
    },
  };

  Project.findOneAndUpdate(
    { _id: pid },
    { $pull: team },
    { new: true, useFindAndModify: false },
    (err, upProject) => {
      if (err) return res.status(400).send(err);
      if (!upProject)
        return res.status(200).json({
          message: "Problem occured: user not removed",
        });
      res.status(201).json({
        message: "User removed from project",
        data: upProject,
      });
    }
  );
};

// exports.changeRole = (req, res) => {

// }