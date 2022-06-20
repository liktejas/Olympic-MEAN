const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/olympic")
.then(()=>console.log('Connection Successfull'))
.catch((error)=>console.error(error))