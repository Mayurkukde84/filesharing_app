const Upload = require('../controller/Controller')

const express = require('express')
const router = express.Router()




router.route('/upload').post(Upload.imageUpload)
router.route('/:uuid').get(Upload.show)
router.route('/files/downloads/:uuid').get(Upload.downloadFile)
router.route('/api/files/send').post(Upload.send)

module.exports = router
