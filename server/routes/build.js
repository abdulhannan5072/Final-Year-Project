const routes = require('express').Router();

const {Build}= require('../models/build');

//Create
routes.post('/api/build/create',(req,res)=>{
    const build =new Build(req.body)
    build.save(function(err,doc){
        if(err) return res.status(400).send(err);
        res.status(200).send(doc);
    })
})

//getData

routes.get('/api/getBuild', (req,res)=>{
    Build.find({}, (err, data)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(data);
    })
})




// //Delete
// routes.post('/api/build/delete', function(req,res)
// {
//     let id =req.body.id;
//     Build.findByIdAndRemove(id, (err,build)=>{
//         if(err) return res.status(400).send(err);
//         if(!build) return res.json({
//          message:'Build  removed'
         
//         }) 
//      })

// })
// //Find
// routes.post('/api/build/find',function(req,res){
//     Build.findOne({'name':req.body.name},(err,build)=>{
//         if(err) return res.status(400).send(err);
//         if(!build) return res.json(
//             {
//                 message:'Build not found '
//             }
//         )
//         else if (build) res.json({
//             message:'Build found'

//         }
//         )
//     })
// })
// //Update
// routes.post('/api/build/update',(req,res)=>
// {
//     Build.findByIdAndUpdate(req.body.id, req.body, {new:true}, (err,doc)=>{
//         if(err) return res.status(400).send(err);
//             res.status(200).send(doc);
//         })
// })
    

module.exports = routes;