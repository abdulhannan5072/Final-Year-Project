const routes = require('express').Router();
const{AdaptiveMaintenance}=require('../models/adaptive_maintenance');

routes.post('/api/adaptivemaintenance/create',(req,res)=>{
    const adaptivemaintenance =new AdaptiveMaintenance(req.body)
    adaptivemaintenance.save(function(err,doc){
    if(err) return res.status(400).send(err);
    res.status(200).send(doc);
}
)
})
routes.get('/api/getadaptivemaintenance', (req,res)=>{
    AdaptiveMaintenance.find({}, (err, data)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(data);
    })
})
//Delete
routes.post('/api/adaptivemaintenance/delete', function(req,res){
    let id =req.body.id;
    AdaptiveMaintenance.findByIdAndDelete(id, (err,adaptivemaintenance)=>{
        if(err) return res.status(400).send(err);
        if(!adaptivemaintenance) return res.json({
         message:'AdaptiveMaintenance Phase  Removed'
         
        }) 
     })

})
//Find
routes.post('/api/adaptivemaintenance/find',function(req,res){
    AdaptiveMaintenance.findOne({'name':req.body.name},(err,adaptivemaintenance)=>{
        if(err) return res.status(400).send(err);
        if(!adaptivemaintenance) return res.json(
            {
                message:'AdaptiveMaintenance Phase not found '
            }
        )
        else if (adaptivemaintenance) res.json({
            message:'AdaptiveMaintenance Phase found'

        }
        )
    })
})
//Update
routes.post('/api/adaptivemaintenance/update',(req,res)=>
{
    AdaptiveMaintenance.findByIdAndUpdate(req.body.id, req.body, {new:true}, (err,doc)=>{
        if(err) return res.status(400).send(err);
            res.status(200).send(doc);
        })
})

module.exports = routes;