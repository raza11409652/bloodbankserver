const mongoose = require('mongoose')

const user = mongoose.Schema({
    name:{
        type:String ,
        required:true
    },
    email:{
        type:String ,
        required:true,
        unique:true
    },
    bloodGroup:{
        type:String ,
        required: true
    },
    password:{
        type:String ,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    isDonor:{
        type: Boolean,
        default: false
    }
});
module.exports = mongoose.model("user" , user)
