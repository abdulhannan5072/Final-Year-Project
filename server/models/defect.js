const mongoose = require('mongoose');

const defectSchema=mongoose.Schema(
    {
        defect:
        {
             type:String,
             require:true,
             trim:true,
             unique:1

        }, 
     
        defectType:
        {
            type:String,
            require:true,  
        },
        severity:
        {
            type:String,
            require:true,
        },
        description:
        {
            type:String,
            require:true,
        },
        comments:
        {
            type:String,
            require:true,
        },
        assignTo:
        {
            type:String,
            require:true,
        },
        priority:
        {
            type:String,
            require:true,
        },
        defectViewers:
        {
            type:String,
            require:true,
        },
        createddate:
        {
            type:String,
            require:true,
        },
        createdby:
        {
            type:String,
            require:true,
        },
        selectBuild:
        {
            type:String,
            require:true,
        },
        selectModule:
            {
                type:String,
                require:true,
            },
    
    }
)


const Defect=mongoose.model('Defect',defectSchema)
module.exports={Defect};