const multer = require("multer");
const FileUpload = require("../models/fileUploadModel");
const asynHandler = require("express-async-handler");


const multerStorage = multer.diskStorage({destination:(req,file,cb)=>{
  cb(null,'public/img')
},
filename:(req,file,cb)=>{
  const ext = file.mimetype.split('/')[1];
  cb(null,`img-${Date.now()}.${ext}`)
}
})
const multerFilter =  (req,file,cb)=>{
  if(file.mimetype.startsWith('image')){
    cb(null,true)
  }else{
    cb(res.status(400).json({
      message:'Not an image! please upload only images'
    },false))
  }
}
const upload = multer({
  storage:multerStorage,
  fileFilter:multerFilter
})

const uploadPhoto = upload.single('photo')

const imageUpload = asynHandler(async (req, res) => {


const photo = req.file.filename
const {email} = req.body
  const imgUpload = await FileUpload.create({
    photo,
    email
  });
  res.status(200).json({
    status: "success",

    data: {
      imgUpload,
    },
  });
});

module.exports = {
  imageUpload,
 uploadPhoto
  
};
