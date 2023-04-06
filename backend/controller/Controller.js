const multer = require("multer");
const FileUpload = require("../models/fileUploadModel");
const asynHandler = require("express-async-handler");
const path = require('path')
const sendEmail = require('../utility/email')
const {v4:uuid4} = require('uuid');
const sendMail = require("../utility/email");


const multerStorage = multer.diskStorage({destination:(req,file,cb)=>{
  cb(null,'public/img')
},

filename:(req,file,cb)=>{
  const uniqueName = `${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`
  cb(null,uniqueName)
}
})
// const multerFilter =  (req,file,cb)=>{
//   if(file.mimetype.startsWith('image')){
//     cb(null,true)
//   }else{
//     cb(res.status(400).json({
//       message:'Not an image! please upload only images'
//     },false))
//   }
// }
const upload = multer({
  storage:multerStorage,
  limit:{fileSize:100000 * 100} 
})

const uploadPhoto = upload.single('photo')

const imageUpload = asynHandler(async (req, res) => {

  if(!req.file){
    return  res.status(404).json({error:'All fields are required'})
  }
const file = new FileUpload({
  filename:req.file.filename,
  uuid:uuid4(),
  path:req.file.path,
  size:req.file.size
})
const response = await file.save()
return res.json({file:`${process.env.LOCALHOST}/files/${response.uuid}`})
});

const show = asynHandler(async(req,res)=>{
  const file = await FileUpload.findOne({
    uuid:req.params.uuid
  })
  if(!file){
    return res.render('download',{error:'Link has been expired'})
  }
  return res.render('download',{
    uuid:file.uuid,
    fileName:file.filename,
    fileSize:file.size,
    downloadLink:`${process.env.LOCALHOST}/files/downloads/${file.uuid}`
  })
})
const downloadFile = asynHandler(async(req,res)=>{
const file = await FileUpload.findOne({uuid:req.params.uuid})
if(!file){
  return res.render('download',{message:'Link has been expired'})
}
const filepath = `${__dirname}/../${file.path}`
console.log(filepath)
res.download(filepath)
})

const send = asynHandler(async(req,res)=>{
  const {uuid,emailTo,emailForm} = req.body

  if(!uuid || !emailTo || !emailForm){
    return res.status(422).send({error:"All fields are required"})
  }

  const file = await FileUpload.findOne({uuid:uuid})

  if(file.sender){
    return res.status(422).send({error:'Email already send on this email'})
  }
  file.sender = emailForm
  file.receiver = emailTo

  const response = await file.save()

  sendMail({
    from:emailForm,
    to:emailTo,
    subject:'inShare file sharing',
    text:`${emailForm} shared a file with you`,
    html: require('../utility/emailTemplate')({
      emailFrom:emailForm,
      downloadLink:`${process.env.LOCALHOST}/files/${file.uuid}`,
      size:parseInt(file.size/1000) + ' KB',
      expires:'24 hours'
    })
  })
  return res.send({success:true})
})

module.exports = {
  imageUpload,
 uploadPhoto,
 show,
 downloadFile,
 send
  
};
