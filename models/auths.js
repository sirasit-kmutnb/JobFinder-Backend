const mongoose = require('mongoose')

const authSchema = mongoose.Schema({
    email : {
        type:String,
        required:true,
        unique:true
    },
    username: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    role: {
        type:String,
        required:true,
    },
    details: {
        type:{},
        required:true
    },
    subscription: {
        type:Boolean,
        default: false
    }
}, {timestamps:true})

module.exports = mongoose.model("auths", authSchema)