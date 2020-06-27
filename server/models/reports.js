const mongoose=require('mongoose');

const reportSchema=mongoose.Schema(
    {
        reportname:
        {
            type:String,
            require:true,
            unique:1
        },
        title:
        {
            type:String,
            require:true,   
        },
        description:
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
       
        
    }
)
const Report =mongoose.model('Report',reportSchema);
module.exports={Report};