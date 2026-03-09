import { v2 as cloudinary } from 'cloudinary'
import 'dotenv/config'

cloudinary.config({

    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_CLOUD,
    api_secret: process.env.API_CLOUD_SECRET

})



export default cloudinary