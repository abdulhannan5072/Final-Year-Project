const routes = require('express').Router();
const{CorrectiveMaintenance}=require('../models/corrective_maintenance');

routes.post('/api/correctivemaintenance/create',(req,res)=>{
    const correctivemaintenance =new CorrectiveMaintenance(req.body)
    correctivemaintenance.save(function(err,doc){
    if(err) return res.status(400).send(err);
    res.status(200).send(doc);
}
)
})
//find
routes.get('/api/getcorrectivemaintenance', (req,res)=>{
    CorrectiveMaintenance.find({}, (err, data)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(data);
    })
})
//Delete
routes.post('/api/correctivemaintenance/delete', function(req,res){
    let id =req.body.id;
    CorrectiveMaintenance.findByIdAndDelete(id, (err,correctivemaintenance)=>{
        if(err) return res.status(400).send(err);
        if(!correctivemaintenance) return res.json({
         message:'CorrectiveMaintenance Phase  Removed'
         
        }) 
     })

})
//Find
routes.post('/api/correctivemaintenance/find',function(req,res){
    CorrectiveMaintenance.findOne({'defectname':req.body.defectname},(err,correctivemaintenance)=>{
        if(err) return res.status(400).send(err);
        if(!correctivemaintenance) return res.json(
            {
                message:'CorrectiveMaintenance Phase not found '
            }
        )
        else if (correctivemaintenance) res.json({
            message:'CorrectiveMaintenance Phase found'

        }
        )
    })
})
//Update
routes.post('/api/correctivemaintenance/update',(req,res)=>
{
    CorrectiveMaintenance.findByIdAndUpdate(req.body.id, req.body, {new:true}, (err,doc)=>{
        if(err) return res.status(400).send(err);
            res.status(200).send(doc);
        })
})

module.exports = routes;