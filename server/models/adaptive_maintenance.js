const mongoose = require('mongoose');

const adaptivemaintenanceSchema=mongoose.Schema(
    {
    selectBuild:
    {
        type:String,
        require:true,
     
    },
    envAdaptType:
    {
        type:String,
        require:true,
    },
    name:
    {
        type:String,
        require:true,

    },
    selectModule:
    {
        type:String,
        require:true,
       },
    adoptationrequirements:
    {
        type:String,
        require:true,

    }
    }
)
const AdaptiveMaintenance=mongoose.model('AdaptiveMaintenance',adaptivemaintenanceSchema);
module.exports={AdaptiveMaintenance};