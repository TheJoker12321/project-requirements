import multer from 'multer'
import path from 'path'


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images')
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname)
    if (!['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) {

        return cb(new Error('File is not an image'))
    }
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + ext)
  }
})

const upload = multer({ storage: storage , 
    limits: {
        fieldSize: 1024 * 1024 * 2
    }
})

export default upload