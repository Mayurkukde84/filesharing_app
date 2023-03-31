require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
PORT = process.env.PORT

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use('/',express.static(path.join(__dirname, 'public')))
app.use('/',require('./routes/root'))
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})
