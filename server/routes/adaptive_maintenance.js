const routes = require("express").Router();
const { AdaptiveMaintenance } = require("../models/adaptive_maintenance");

routes.post("/api/adaptiveMaintenance/create", (req, res) => {
  const adaptivemaintenance = new AdaptiveMaintenance(req.body);
  adaptivemaintenance.save(function (err, doc) {
    if (err) return res.status(400).send(err);
    res.status(200).send(doc);
  });
});

//get
routes.get("/api/getAdaptiveMaintenance/:id", (req, res) => {
  AdaptiveMaintenance.find({ project: req.params.id }, (err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});

//Delete

routes.post("/api/adaptiveMaintenance/delete", (req, res) => {
  let id = req.body._id;
  AdaptiveMaintenance.findByIdAndDelete(id, (err, doc) => {
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

routes.get("/api/adaptiveMaintenance/:id", (req, res) => {
  let id = req.params.id;
  AdaptiveMaintenance.findById(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    if (!doc)
      return res.json({
        message: "Not found ",
      });
    return res.status(200).send(doc);
  });
});

//Update

routes.post("/api/adaptiveMaintenance/:id", function (req, res) {
    AdaptiveMaintenance.findOneAndUpdate(
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
