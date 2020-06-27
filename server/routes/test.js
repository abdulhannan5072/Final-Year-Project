const routes = require('express').Router();

const {Test}=require('../models/test');
//Create
routes.post('/api/test/create',(req,res)=>{
    const test =new Test(req.body)
    test .save(function(err,doc){
    if(err) return res.status(400).send(err);
    res.status(200).send(doc);
}
)
})
//Delete
routes.post('/api/test/delete', function(req,res)
{
    let id =req.body.id;
    Test.findByIdAndRemove(id, (err,test)=>{
        if(err) return res.status(400).send(err);
        if(!test ) return res.json({
         message:'TestCase   removed'
         
        }) 
     })

})
//Find
routes.post('/api/test/find',function(req,res){
    Test.findOne({'testcase':req.body.testcase},(err,test)=>{
        if(err) return res.status(400).send(err);
        if(!test) return res.json(
            {
                message:'TestCase  not found '
            }
        )
        else if (test) res.json({
            message:'TestCase  found'

        }
        )
    })
})
//Update
routes.post('/api/test/update',(req,res)=>
{
    Test.findByIdAndUpdate(req.body.id, req.body, {new:true}, (err,doc)=>{
        if(err) return res.status(400).send(err);
            res.status(200).send(doc);
        })
})
    

module.exports = routes;