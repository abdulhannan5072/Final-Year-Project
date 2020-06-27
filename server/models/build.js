const mongoose = require('mongoose');


const buildschema=mongoose.Schema({

    build:{
        type:String,
        require:true,
        unique:true

    },
    description:{
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
    }
})



const Build =mongoose.model('Build',buildschema);
module.exports={Build};