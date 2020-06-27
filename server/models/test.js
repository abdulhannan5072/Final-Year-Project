const mongoose = require('mongoose');

const testSchema=mongoose.Schema(
    {
       
        testcase:
        {
            type:String,
            require:true,
            unique:1
            
        },
        description:
        {
            type:String,
            require:true,
        },
        createddate:
        {
            type:String,
            require:true,
        },
        startdate:
        {
            type:String,
            require:true,
        },
        enddate:
        {
            type:String,
            require:true,
        }
    }
)
const Test=mongoose.model('Test',testSchema);
module.exports={Test};