const routes = require("express").Router();

const { Defect } = require("../models/defect");

//Create
routes.post("/api/defect/create", (req, res) => {
  const defect = new Defect(req.body);
  defect.save(function (err, doc) {
    console.log(err)
    if (err) return res.status(400).send(err);
    res.status(200).send(doc);
  });
});

// get 
routes.get("/api/getDefect/:id", (req, res) => {
    Defect.find({ project: req.params.id }, (err, data) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(data);
    });
  });



//Delete

routes.post("/api/defect/delete", (req, res) => {
    let id = req.body._id;
    Defect.findByIdAndDelete(id, (err, doc) => {
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

routes.get("/api/defect/:id", (req, res) => {
    let id = req.params.id;
    Defect.findById(id, (err, doc) => {
      if (err) return res.status(400).send(err);
      if (!doc)
        return res.json({
          message: "Not found ",
        });
      return res.status(200).send(doc);
    });
  });

//Update

routes.post("/api/defect/:id", function (req, res) {
    Defect.findOneAndUpdate(
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
