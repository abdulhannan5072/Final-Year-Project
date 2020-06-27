const mongoose = require('mongoose');


const moduleschema=mongoose.Schema({

    module:{
        type:String,
        require:true,
       

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



const Module =mongoose.model('Module',moduleschema);
module.exports={Module};