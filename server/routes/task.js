const routes = require("express").Router();

const { Task } = require("../models/task");

//Create
routes.post("/api/task/create", (req, res) => {
  const task = new Task(req.body);
  task.save(function (err, doc) {
    if (err) return res.status(400).send(err);
    res.status(200).send(doc);
  });
});

// get
routes.get("/api/getTask/:id", (req, res) => {
  Task.find({ project: req.params.id }, (err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});

//Delete

routes.post("/api/task/delete", (req, res) => {
  let id = req.body._id;
  Task.findByIdAndDelete(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    if (!doc)
      return res.json({
        message: "Not Found",
      });
    return res.status(201).json({
      message: "Deleted Succesfully",
    });
  });
});

//Find

routes.get("/api/task/:id", (req, res) => {
  let id = req.params.id;
  Task.findById(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    if (!doc)
      return res.json({
        message: "Not found ",
      });
    return res.status(200).send(doc);
  });
});

//Update

routes.post("/api/task/:id", function (req, res) {
  Task.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true, useFindAndModify: false },
    (err, doc) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(doc);
    }
  );
});

routes.get("/api/getToDoTask/:user", (req, res) => {
  Task.find(
    { $and: [{ assignTo: req.params.user }, { status: "To do" }] },
    (err, doc) => {
      if (err) return res.status(400).send(err);
      if (!doc)
        return res.status(200).json({
          message: "Not found",
        });
      res.status(200).send(doc);
    }
  );
});

routes.get("/api/getInProgressTask/:user", (req, res) => {
  Task.find(
    { $and: [{ assignTo: req.params.user }, { status: "In Progress" }] },
    (err, doc) => {
      if (err) return res.status(400).send(err);
      if (!doc)
        return res.status(200).json({
          message: "Not found",
        });
      res.status(200).send(doc);
    }
  );
});

routes.get("/api/getDoneTask/:user", (req, res) => {
  Task.find(
    { $and: [{ assignTo: req.params.user }, { status: "Done" }] },

    (err, doc) => {
      if (err) return res.status(400).send(err);
      if (!doc)
        return res.status(200).json({
          message: "Not found",
        });
      res.status(200).send(doc);
    }
  );
});

module.exports = routes;
