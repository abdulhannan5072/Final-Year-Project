const mongoose = require('mongoose');

const perfectivemaintenanceSchema=mongoose.Schema(
    {
    selectBuild:
    {
        type:String,
        require:true,
       
    },
    functionalityType:
    {
        type:String,
        require:true,
    },
    functionalityName:
    {
        type:String,
        require:true,

    },
    selectModule:
    {
        type:String,
        require:true,


    },
    requirements:
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
const PerfectiveMaintenance=mongoose.model('PerfectiveMaintenance',perfectivemaintenanceSchema);
module.exports={PerfectiveMaintenance};