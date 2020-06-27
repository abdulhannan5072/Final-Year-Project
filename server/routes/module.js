const routes = require('express').Router();


const {Module}=require('../models/module')

//Create
routes.post('/api/module/create',(req,res)=>{
    const module =new Module(req.body)
    module.save(function(err,doc){
    if(err) return res.status(400).send(err);
    res.status(200).send(doc);
}
)
})
//Get
routes.get('/api/getModule', (req,res)=>{
    Module.find({}, (err, data)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(data);
    })
})
//Delete
routes.post('/api/module/delete', function(req,res)
{
    let id =req.body.id;
    Module.findByIdAndRemove(id, (err,module)=>{
        if(err) return res.status(400).send(err);
        if(!module) return res.json({
         message:'Module  removed'
         
        }) 
     })

})
//Find
routes.post('/api/module/find',function(req,res){
    Module.findOne({'name':req.body.name},(err,module)=>{
        if(err) return res.status(400).send(err);
        if(!module) return res.json(
            {
                message:'Module not found '
            }
        )
        else if (build) res.json({
            message:'Module found'

        }
        )
    })
})
//Update
routes.post('/api/module/update',(req,res)=>
{
    Module.findByIdAndUpdate(req.body.id, req.body, {new:true}, (err,doc)=>{
        if(err) return res.status(400).send(err);
            res.status(200).send(doc);
        })
})
    

module.exports = routes;