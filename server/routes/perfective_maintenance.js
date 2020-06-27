const routes = require('express').Router();
const{PerfectiveMaintenance}=require('../models/perfective_maintenance');

routes.post('/api/perfectivemaintenance/create',(req,res)=>{
    const perfectivemaintenance =new PerfectiveMaintenance(req.body)
    perfectivemaintenance.save(function(err,doc){
    if(err) return res.status(400).send(err);
    res.status(200).send(doc);
}
)
})
routes.get('/api/getperfectivemaintenance', (req,res)=>{
    PerfectiveMaintenance.find({}, (err, data)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(data);
    })
})
//Delete
routes.post('/api/perfectivemaintenance/delete', function(req,res){
    let id =req.body.id;
    PerfectiveMaintenance.findByIdAndDelete(id, (err,perfectivemaintenance)=>{
        if(err) return res.status(400).send(err);
        if(!perfectivemaintenance) return res.json({
         message:'PerfectiveMaintenance phase  Removed'
         
        }) 
     })

})
//Find
routes.post('/api/perfectivemaintenance/find',function(req,res){
    PerfectiveMaintenance.findOne({'functionallityname':req.body.functionallityname},(err,perfectivemaintenance)=>{
        if(err) return res.status(400).send(err);
        if(!perfectivemaintenance) return res.json(
            {
                message:'PerfectiveMaintenance Phase not found '
            }
        )
        else if (perfectivemaintenance) res.json({
            message:'PerfectiveMaintenancee Phase found'

        }
        )
    })
})
//Update
routes.post('/api/perfectivemaintenance/update',(req,res)=>
{
    PerfectiveMaintenance.findByIdAndUpdate(req.body.id, req.body, {new:true}, (err,doc)=>{
        if(err) return res.status(400).send(err);
            res.status(200).send(doc);
        })
})

module.exports = routes;