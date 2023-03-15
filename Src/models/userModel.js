const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    firstname:{type:String,require:true},
    lastname:{type:String,require:true},
    mobile:{type:Number,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true}
},{
    versionKey:false
})

const userModel=mongoose.model("users",userSchema)
module.exports={userModel}
