import multer from 'multer'
import path from 'path'

let ext;

const storage = multer.memoryStorage()

const upload = multer({

    storage,
    limits: {
        files: 1
    },
    fileFilter: function (req, file, cb) {

        ext = path.extname(file.originalname)

        if (ext !== '.csv') {

            return cb(new Error('This is not a csv file'))
        }

        cb(null, true)
    }
})

export default upload