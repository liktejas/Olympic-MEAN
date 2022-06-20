const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    }
})

const Admins = mongoose.model("admin", adminSchema)

module.exports = Admins