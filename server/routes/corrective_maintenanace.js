const routes = require("express").Router();
const { CorrectiveMaintenance } = require("../models/corrective_maintenance");

routes.post("/api/correctivemaintenance/create", (req, res) => {
  const correctivemaintenance = new CorrectiveMaintenance(req.body);
  correctivemaintenance.save(function (err, doc) {
    if (err) return res.status(400).send(err);
    res.status(200).send(doc);
  });
});

//get
routes.get("/api/getCorrectiveMaintenance/:id", (req, res) => {
  CorrectiveMaintenance.find({ project: req.params.id }, (err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});

//Delete

routes.post("/api/correctiveMaintenance/delete", (req, res) => {
  let id = req.body._id;
  CorrectiveMaintenance.findByIdAndDelete(id, (err, doc) => {
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

routes.get("/api/correctiveMaintenance/:id", (req, res) => {
  let id = req.params.id;
  CorrectiveMaintenance.findById(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    if (!doc)
      return res.json({
        message: "Not found ",
      });
    return res.status(200).send(doc);
  });
});

//Update

routes.post("/api/correctiveMaintenance/:id", function (req, res) {
  CorrectiveMaintenance.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true, useFindAndModify: false },
    (err, doc) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(doc);
    }
  );
});

module.exports = routes;
