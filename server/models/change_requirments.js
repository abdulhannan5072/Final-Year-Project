const mongoose = require('mongoose');


const changerequirmentsSchema=mongoose.Schema(
    {
        projectname:
        {
            type:String,
            require:true,
            trim:true,
            unique:1
        },
        requirments:
        {
            type:String,
            require:true
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
        }
    }
)

const ChangeRequirments =mongoose.model('ChangeRequirments',changerequirmentsSchema);
module.exports={ChangeRequirments};