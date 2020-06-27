const routes = require('express').Router();

const{Report}=require('../models/reports');
//Create
routes.post('/api/reports/create',(req,res)=>{
    const report =new Report(req.body)
    report.save(function(err,doc){
    if(err) return res.status(400).send(err);
    res.status(200).send(doc);
}
)
})
//Delete
routes.post('/api/reports/delete', function(req,res){
    let id =req.body.id;
    Report.findByIdAndDelete(id, (err,report)=>{
        if(err) return res.status(400).send(err);
        if(!report) return res.json({
         message:'Report  removed'
         
        }) 
     })

})
//Find
routes.post('/api/reports/find',function(req,res){
    Report.findOne({'reportname':req.body.reportname},(err,report)=>{
        if(err) return res.status(400).send(err);
        if(!report) return res.json(
            {
                message:'Report not found '
            }
        )
        else if (report) res.json({
            message:'Report found'

        }
        )
    })
})
//Update
routes.post('/api/reports/update',(req,res)=>
{
    Report.findByIdAndUpdate(req.body.id, req.body, {new:true}, (err,doc)=>{
        if(err) return res.status(400).send(err);
            res.status(200).send(doc);
        })
})
    
 

module.exports = routes;