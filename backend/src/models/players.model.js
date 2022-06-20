const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
    ranking:{
        type: Number,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true,
        trim: true
    },
    dob:{
        type: String,
        required: true,
        trim: true
    },
    country:{
        type: String,
        required: true,
        trim: true
    },
    score:{
        type: Number,
        required: true,
        trim: true
    },
    event:{
        type: String,
        trim: true,
        default: "100m"
    },
    added_at:{
        type: String,
        default: new Date()
    },
    updated_at:{
        type: String,
        default: new Date()
    }
})

const Players = new mongoose.model("Players", playerSchema)

module.exports = Players