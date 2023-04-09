const mongoose = require('mongoose')

const fileUploadSchema = new mongoose.Schema({
    filename:{
        type:String,
        required:true
    },
    path:{
        type:String,
        required:true
    },
    size:{
        type:Number,
        required:true
    },
    uuid:{
        type:String,
        required:false
    },
    sender:{
        type:String,
        required:false
    },
    receiver:{
        type:String,
        required:false
    }

},
    {
        timestamps:true
    }
)


module.exports =mongoose.model("FileUpload",fileUploadSchema)