const mongoose = require('mongoose')

const bloodBank = mongoose.Schema({
    number:{
        type:String,
        default:null ,
    },
    name:{
        type:String,
        default:null ,
    },
    state:{
        type:String,
        default:null
    },district:{
        type:String,
        default:null ,
    },
    city:{
        type:String,
        default:null ,
    },
    address:{
        type:String,
        default:null ,
    },
    pinCode:{
        type:String,
        default:null ,
    },
    contactNumber:{
        type:String,
        default:null ,
    },
    mobile:{
        type:String,
        default:null ,
    },
    helpLine:{
        type:String,
        default:null ,
    },
    fax:{
        type:String,
        default:null ,
    },
    email:{
        type:String,
        default:null ,
    },
    website:{
        type:String,
        default:null ,
    },
    nodalOfficer:{
        name:{
            type:String,
            default:null ,
        },
        contact:{
            type:String,
            default:null ,
        },
        mobile:{
            type:String,
            default:null ,
        },
        email:{
            type:String,
            default:null ,
        },
        qualification:{
            type:String,
            default:null ,
        }

    },
    category:{
        type:String,
        default:null ,
    },
    bloodAvailable:{
        type:String,
        default:null ,
    },
    apheresis:{
        type:String,
        default:null ,
    },
    serviceTime:{
        type:String,
        default:null ,
    },
    license:{
        type:String,
        default:null ,
    },
    licenseObtainedOn:{
        type:String,
        default:null ,
    },
    renewDate:{
        type:String,
        default:null ,
    },
    latitude:{
        type:String,
        default:null ,
    },
    longitude:{
        type:String,
        default:null ,
    }

})
module.exports = mongoose.model('bloodbank',bloodBank)