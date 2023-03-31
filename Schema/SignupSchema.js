const mongoose=require('mongoose')

const SignupSchema=mongoose.Schema({
UserName:{
    type:String
},
email:{
    type:String
},
password:{
    type:String
},
role:{
    type:String
}
})

const SignUpModel=mongoose.model("User",SignupSchema)

module.exports=SignUpModel