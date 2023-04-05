const mongoose = require('mongoose')

const fileUploadSchema = new mongoose.Schema({
    email:{
        type:String
    },
    photo:{
        type:String
    }
})


module.exports =mongoose.model("FileUpload",fileUploadSchema)