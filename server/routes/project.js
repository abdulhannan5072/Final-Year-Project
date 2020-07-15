const routes = require("express").Router();

const { Project } = require("../models/project");
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
    if (!project) return res.json({
        message: "Not Found",
      });
    return res.status(201).json({
      message: 'Project Deleted Succesfully'
    })
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
  Project.find({owner: req.params.id}, (err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
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

/*   else if('key')
    {
        Project.findByIdAndUpdate(
            "5ec0562d7d398a27e0ce9416",
            {$set :{key:req.body,key}},
                {new:true},
                (err,doc) =>{ if(err) return console.log(err);
                    console.log(doc);
                })
    }
    else if('type')
    {
        Project.findByIdAndUpdate(
            "5ec0562d7d398a27e0ce9416",
            {$set :{type:req.body,type}},
                {new:true},
                (err,doc) =>{ if(err) return console.log(err);
                    console.log(doc);
                })
    }
    else if('createddate')
    {
        Project.findByIdAndUpdate(
            "5ec0562d7d398a27e0ce9416",
            {$set :{createddate:req.body,createddate}},
                {new:true},
                (err,doc) =>{ if(err) return console.log(err);
                    console.log(doc);
                })
    }
    else if('createdby')
    {
        Project.findByIdAndUpdate(
            "5ec0562d7d398a27e0ce9416",
            {$set :{createdby:req.body,createdby}},
                {new:true},
                (err,doc) =>{ if(err) return console.log(err);
                    console.log(doc);
                })
    }
    else{
        console.log('nothing happen');
    }
    */

module.exports = routes;
