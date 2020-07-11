const routes = require("express").Router();

const Upload = require("../models/upload");

routes.post("/api/upload", (req, res) => {
  // console.log(req.file);
  // return res.status(200).json({
  //   message: "true"
  // })
  if (!req.file) {
    return res.status(400).send("File not aval");
  }
  console.log(req.file.filename)
  console.log(req.file.path)
  
  const upload = new Upload({
    fileName: req.file.filename,
    url: req.file.path,
    // user: req.body.user
  });
  console.log(upload)
  // return res.status(200).send('done')
  upload.save(function (err, doc) {
    if (err) return res.status(500).send(err);
    console.log(doc)
    res.status(200).json({
      upload: true,
      file: doc,
    });
  });
});

module.exports = routes;
