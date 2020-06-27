const routes = require('express').Router();
const {ChangeRequirments}=require('../models/change_requirments');

routes.post('/api/changerequirments/create',(req,res)=>{
    const changerequirments =new ChangeRequirments(req.body)
    changerequirments.save(function(err,doc){
    if(err) return res.status(400).send(err);
    res.status(200).send(doc);
}
)
})
//Delete
routes.post('/api/changerequirments/delete', function(req,res){
    let id =req.body.id;
    ChangeRequirments.findByIdAndDelete(id, (err,changerequirments)=>{
        if(err) return res.status(400).send(err);
        if(!changerequirments) return res.json({
         message:'ChangeRequirments  Removed'
         
        }) 
     })

})
//Find
routes.post('/api/changerequirments/find',function(req,res){
    ChangeRequirments.findOne({'projectname':req.body.name},(err,changerequirments)=>{
        if(err) return res.status(400).send(err);
        if(!changerequirments) return res.json(
            {
                message:'ChangeRequirments Phase not found '
            }
        )
        else if (changerequirments) res.json({
            message:'ChangeRequirments Phase found'

        }
        )
    })
})
//Update
routes.post('/api/changerequirments/update',(req,res)=>
{
    ChangeRequirments.findByIdAndUpdate(req.body.id, req.body, {new:true}, (err,doc)=>{
        if(err) return res.status(400).send(err);
            res.status(200).send(doc);
        })
})

module.exports = routes;