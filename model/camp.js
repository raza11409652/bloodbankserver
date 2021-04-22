const mongoose = require('mongoose')

const camp = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: String,
        required: true
    },
    start: {
        type: String,
        required: true
    },
    end: {
        type: String,
        default: null
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        default: null
    }
});
module.exports = mongoose.model("camp", camp)
