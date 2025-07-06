const express = require('express')
const multer = require('multer')
const fs = require('fs')
const path = require('path')

const app = express()

const port = 3100

const customFileFilter = (req, file, cb) => {
    cb(true)
}

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'exam/')
        },
        filename: (req, file, cb) => {
            // cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
            cb(null, `loginId-${Date.now()}${path.extname(file.originalname)}`)
        },

    }),
    // fileFilter: customFileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
})

// curl -F "file=@file" localhost:3000/upload
app.post('/upload', upload.any(), (req, res) => {

    console.log(Object.keys(req))
    console.log(req.files)
    // console.log(res)
    // res.send('success')
    res.json({
        id: 'loginId',
        fileName: req.files[0].filename,
        ext: path.extname(req.files[0].filename),
    })
})

app.get('/', (req, res) => {
    res.send('simple express server')
})

app.listen(port, () => {
    console.log(`Start server http://localhost:${port}`)
})