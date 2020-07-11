const routes = require("express").Router();

const { Module } = require("../models/module");

//Create
routes.post("/api/module/create", (req, res) => {
  const module = new Module(req.body);
  module.save(function (err, doc) {
    if (err) return res.status(400).send(err);
    res.status(200).send(doc);
  });
});

//Get

routes.get("/api/getModule/:id", (req, res) => {
  Module.find({ project: req.params.id }, (err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});

//Delete

routes.post("/api/module/delete", (req, res) => {
  let id = req.body._id;
  Module.findByIdAndDelete(id, (err, module) => {
    if (err) return res.status(400).send(err);
    if (!module)
      return res.json({
        message: "Not Found",
      });
    return res.status(201).json({
      message: "Module Deleted Succesfully",
    });
  });
});

//Find

routes.get("/api/module/:id", (req, res) => {
  let id = req.params.id;
  Module.findById(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    if (!doc)
      return res.json({
        message: "Build not found ",
      });
    return res.status(200).send(doc);
  });
});

//Update


routes.post("/api/module/:id", function (req, res) {
  Module.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true, useFindAndModify: false },
    (err, doc) => {
      if (err) return res.status(400).send(err);
      res.status(201).send(doc);
    }
  );
});

module.exports = routes;
