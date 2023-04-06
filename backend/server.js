require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
const connectDB = require('./config/connectdb')
const { default: mongoose } = require('mongoose')
PORT = process.env.PORT
connectDB()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

app.use('/',express.static(path.join(__dirname, 'public')))
app.use('/',require('./routes/root'))
app.use('/',require('./routes/imageUploadRoute'))

app.all('*',(req,res,next)=>{
res.status(404)
if(req.accepts('html')){
    res.sendFile(path.join(__dirname,'views','404.html'))
}
})

mongoose.connection.once('open',()=>{
    console.log('mongodb is connected')
    app.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`)
    })
})


mongoose.connection.once('err',(err)=>{
    console.log(err)
})