const routes = require('express').Router();

const{Task}=require('../models/task');

//Create
routes.post('/api/task/create',(req,res)=>{
    const task =new Task(req.body)
    task.save(function(err,doc){
    if(err) return res.status(400).send(err);
    res.status(200).send(doc);
}
)
})
routes.get('/api/gettask', (req,res)=>{
    Task.find({}, (err, data)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(data);
    })
})
//Delete
routes.post('/api/task/delete', function(req,res){
    let id =req.body.id;
    Task.findByIdAndDelete(id, (err,task)=>{
        if(err) return res.status(400).send(err);
        if(!task) return res.json({
         message:'Task removed'
         
        }) 
     })

})
//Find
routes.post('/api/task/find',function(req,res){
    Task.findOne({'taskname':req.body.taskname},(err,task)=>{
        if(err) return res.status(400).send(err);
        if(!task) return res.json(
            {
                message:'Task not found '
            }
        )
        else if (task) res.json({
            message:'Task found'

        }
        )
    })
})
//Update
routes.post('/api/task/update',(req,res)=>
{
    Task.findByIdAndUpdate(req.body.id, req.body, {new:true},
         (err,doc)=>
         {
        if(err) return res.status(400).send(err);
            res.status(200).send(doc);
        })
})
module.exports=routes;