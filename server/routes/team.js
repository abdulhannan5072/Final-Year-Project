const routes = require('express').Router();

const {Team}=require('../models/team');

//Create
routes.post('/api/team/create',(req,res)=>{
    const team =new Team(req.body)
    team .save(function(err,doc){
    if(err) return res.status(400).send(err);
    res.status(200).send(doc);
}
)
})
//Delete
routes.post('/api/team/delete', function(req,res)
{
    let id =req.body.id;
    Team.findByIdAndRemove(id, (err,team)=>{
        if(err) return res.status(400).send(err);
        if(!team ) return res.json({
         message:'Team   removed'
         
        }) 
     })

})
//Find
routes.post('/api/team/find',function(req,res){
    Team.findOne({'teamname':req.body.teamname},(err,team)=>{
        if(err) return res.status(400).send(err);
        if(!team) return res.json(
            {
                message:'Team  not found '
            }
        )
        else if (team) res.json({
            message:'Team  found'

        }
        )
    })
})
//Update
routes.post('/api/team/update',(req,res)=>
{
    Team.findByIdAndUpdate(req.body.id, req.body, {new:true}, (err,doc)=>{
        if(err) return res.status(400).send(err);
            res.status(200).send(doc);
        })
})
    

module.exports = routes;