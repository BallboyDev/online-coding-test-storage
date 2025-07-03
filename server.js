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
            cb(null, 'upload/')
        },
        filename: (req, file, cb) => {
            cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
        },

    }),
    // fileFilter: customFileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
})

// curl -F "file=@file" localhost:3000/upload
app.post('/upload', upload.any(), (req, res) => {
    res.send('success')
})

app.get('/', (req, res) => {
    res.send('simple express server')
})

app.listen(port, () => {
    console.log(`Start server http://localhost:${port}`)
})