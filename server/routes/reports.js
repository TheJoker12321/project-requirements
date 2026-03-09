import express from 'express'
import uploadImage from '../utils/uploadImage.js'
import cloudinary from '../cloudinary/connect.js'
import { loadCSV } from '../utils/readCSV.js'
import uploadCSV from '../utils/uploadFileCsv.js'
import authUser from '../middlewere/authUser.js'
import { nanoid } from 'nanoid'
import fs from 'fs'


const report = express.Router()


report.post('/', authUser , uploadImage.single('image'), async (req, res) => {

    const { report } = req.body
    console.log(req.payload);
    

    const {category, urgency, message} = JSON.parse(report)
        if (!category || !urgency || !message) {

            return res.status(400).json({
                error: 'missing category or urgency or message'
            })
        }
    
    try {

        const imageCloud = await cloudinary.uploader.upload(req.file.path)

        const report = {
                id: nanoid(),
                userid: req.payload.id,
                category,
                urgency,
                message,
                imagePath: imageCloud.secure_url,
                sourceType: 'form',
                createdAt: new Date(Date.now())
            }

        const reportsData = JSON.parse(await fs.promises.readFile('data/reports.json', 'utf-8'))
        reportsData.push(report)
        await fs.promises.writeFile('data/reports.json', JSON.stringify(reportsData))
        
        res.status(201).json({

            report
        })

    } catch (err) {

        res.status(500).json({

            error: err.message
        })
    }
})

report.post('/csv', authUser, uploadCSV.single('file'), async (req, res) => {

    try {
        
        const result = await loadCSV(req.file.path)
        console.log(result);
        
        res.status(201).json({
            result
        })

    } catch (err) {

        res.status(500).json({

            error: err.message
        })
    }

})



export default report
