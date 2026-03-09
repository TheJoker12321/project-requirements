import multer from 'multer'
import path from 'path'

let ext;

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        console.log(file);
        

        cb(null, 'csvFiles')
    },
    filename: function (req, file, cb) {

        ext = path.extname(file.originalname)
        console.log(ext);
        
        if (ext === '.csv') {

            cb(null, file.fieldname + ext)
        }
    }
})

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