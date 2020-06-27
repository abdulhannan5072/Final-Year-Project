const mongoose = require('mongoose');



const taskSchema=mongoose.Schema(
    {
        taskName:
        {
            type:String,
            require:true,
            trim:true,
            unique:1
        },
        status:{
            type:String,
            require:true,
        },
        description:
        {
            type:String,
            require:true
        },
        url:
        {
            type:String,
            require:true
        },
        linktext:
        {
            type:String,
            require:true
        },
        assignTo:
        {
            type:String,
            require:true
        },
        reporter:
        {
            type:String,
            require:true
        },
        createddate:
        {
            type:String,
            require:true
        },
        createdby:
        {
            type:String,
            require:true
        },
        startdate:
        {
            type:String,
            require:true

        },
        enddate:
        {
            type:String,
            require:true

        }

    }
)
const Task =mongoose.model('Task',taskSchema);
module.exports={Task};