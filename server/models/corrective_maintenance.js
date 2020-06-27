const mongoose = require('mongoose');

const correctivemaintenanceSchema=mongoose.Schema(
    {
    selectBuild:
    {
        type:String,
        require:true,
      
    },
    faultType:
    {
        type:String,
        require:true,
    },
    fault:
    {
        type:String,
        require:true,

    },
    selectModule:
    {
        type:String,
        require:true, 
    },
    description:
    {
        type:String,
        require:true,

    }
    }
)
const CorrectiveMaintenance=mongoose.model('CorrectiveMaintenance',correctivemaintenanceSchema);
module.exports={CorrectiveMaintenance};