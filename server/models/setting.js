const mongoose = require('mongoose');

const settingSchema=mongoose.Schema(
{
    name:
    {
        type:String,
        require:true,
    },
    userName:
    {
        type:String,
        require:true,
    },
    email:
    {
        type:String,
        require:true,
    },
    currentPassword:
    {
        type:String,
        require:true,
    },
    newPassword:
    {
        type:String,
        require:true,
    }

}
)

const Setting=mongoose.model('Setting',settingSchema);
module.exports={Setting};










