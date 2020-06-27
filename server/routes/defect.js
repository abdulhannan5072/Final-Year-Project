const routes = require('express').Router();


const{Defect}=require('../models/defect');


//Create
routes.post('/api/defect/create',(req,res)=>{
    const defect =new Defect(req.body)
    defect.save(function(err,doc){
    if(err) return res.status(400).send(err);
    res.status(200).send(doc);
}
)
})
routes.get('/api/getdefect', (req,res)=>{
    Defect.find({}, (err, data)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(data);
    })
})
//Delete
routes.post('/api/defect/delete', function(req,res)
{
    let id =req.body.id;
    Defect.findByIdAndRemove(id, (err,defect)=>{
        if(err) return res.status(400).send(err);
        if(!defect) return res.json({
         message:'Defect  removed'
         
        }) 
     })

})
//Find
routes.post('/api/defect/find',function(req,res){
    Defect.findOne({'defectname':req.body.defectname},(err,defect)=>{
        if(err) return res.status(400).send(err);
        if(!defect) return res.json(
            {
                message:'Defect not found '
            }
        )
        else if (defect) res.json({
            message:'Defect found'

        }
        )
    })
})
//Update
routes.post('/api/defect/update',(req,res)=>
{
    Defect.findByIdAndUpdate(req.body.id, req.body, {new:true}, 
        (err,doc)=>{
        if(err) return res.status(400).send(err);
            res.status(200).send(doc);
        })
})
    

module.exports = routes;