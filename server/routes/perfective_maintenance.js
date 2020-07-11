const routes = require("express").Router();
const { PerfectiveMaintenance } = require("../models/perfective_maintenance");

routes.post("/api/functionatilityAddition/create", (req, res) => {
  const perfectivemaintenance = new PerfectiveMaintenance(req.body);
  perfectivemaintenance.save(function (err, doc) {
    if (err) return res.status(400).send(err);
    res.status(200).send(doc);
  });
});

//get
routes.get("/api/getFunctionatilityAddition/:id", (req, res) => {
  PerfectiveMaintenance.find({ project: req.params.id }, (err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});

//Delete

routes.post("/api/functionatilityAddition/delete", (req, res) => {
  let id = req.body._id;
  PerfectiveMaintenance.findByIdAndDelete(id, (err, doc) => {
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

routes.get("/api/functionatilityAddition/:id", (req, res) => {
  let id = req.params.id;
  PerfectiveMaintenance.findById(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    if (!doc)
      return res.json({
        message: "Not found ",
      });
    return res.status(200).send(doc);
  });
});

//Update

routes.post("/api/functionatilityAddition/:id", function (req, res) {
  PerfectiveMaintenance.findOneAndUpdate(
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
