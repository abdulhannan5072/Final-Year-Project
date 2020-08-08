const routes = require("express").Router();
const { Project } = require("../models/project");
const projectController = require("../controllers/projects");

//Create
routes.post("/api/projects/create", (req, res) => {
  const project = new Project(req.body);
  project.save(function (err, doc) {
    if (err) return res.status(400).send(err);
    res.status(200).send(doc);
  });
});
//Delete
routes.post("/api/projects/delete", function (req, res) {
  let id = req.body._id;
  Project.findByIdAndDelete(id, (err, project) => {
    if (err) return res.status(400).send(err);
    if (!project)
      return res.json({
        message: "Not Found",
      });
    return res.status(201).json({
      message: "Project Deleted Succesfully",
    });
  });
});
//Find
routes.post("/api/projects/find", function (req, res) {
  Project.findOne({ name: req.body.name }, (err, project) => {
    if (err) return res.status(400).send(err);
    if (!project)
      return res.json({
        message: "Not Found ",
      });
    else if (project)
      res.json({
        message: "Project found",
      });
  });
});

//getData

routes.get("/api/getProjects/:id", (req, res) => {
  Project.find(
    {
      $or: [
        { owner: req.params.id },
        { team: { $elemMatch: { userId: req.params.id } } }
      ],
    },
    (err, data) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(data);
    }
  );
});

//Update
routes.post("/api/projects/update", (req, res) => {
  Project.findByIdAndUpdate(
    req.body.id,
    req.body,
    { new: true },
    (err, doc) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(doc);
    }
  );
});

// add user into team
routes.post("/api/addUserInProject/:pid", projectController.addUserInProject);

//remove user from team
routes.post(
  "/api/removeUserFromProject/:pid",
  projectController.removeUserFromProject
);

//change role of user in team
// routes.post("/api/changeRole/:pid", projectController.changeRole)

routes.get("/api/getTeam/:pid", (req, res) => {
  Project.findOne({ _id: req.params.pid }, (err, doc) => {
    if (err) return res.status(400).send(err);
    if (!doc)
      return res.status(200).json({
        message: "project not found",
      });
    const data = doc.team;
    res.status(200).json({
      team: data,
    });
  });
});

module.exports = routes;
