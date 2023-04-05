const Upload = require('../controller/Controller')

const express = require('express')
const router = express.Router()




router.route('/upload').post(Upload.uploadPhoto,Upload.imageUpload)

module.exports = router
