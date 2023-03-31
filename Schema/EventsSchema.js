const mongoose=require('mongoose')

const eventSchema=mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    date:{
        type:String
    },
    startsAt:{
        type:String
    },
    endsAt:{
        type:String
    },
    typeOf:{
        type:String
    },
    userID:{
        type:String
    }
})

const EventsModal=mongoose.model("events",eventSchema)
module.exports=EventsModal