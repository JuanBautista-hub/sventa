const multer = require('multer')

storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(req.file)
        cb(null, './public/avatar/temp')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

upload = multer({ storage })


module.exports = upload