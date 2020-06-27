const mongoose=require('mongoose');


const teamSchema=mongoose.Schema(
    {
        teamname:
        {
            type:String,
            require:true,
            unique:1
        },
        members:
        {
            type:String,
            require:true,
        },
        workingproject:
        {
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
    }
)
const Team=mongoose.model('Team',teamSchema);
module.exports={Team}