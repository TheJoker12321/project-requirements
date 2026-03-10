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

    console.log(req.body);
    
    const { report } = req.body    

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
                userId: req.payload.id,
                category,
                urgency,
                message,
                imagePath: imageCloud.secure_url,
                sourceType: 'form',
                createdAt: new Date().toDateString()
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
        
        const result = await loadCSV(req.file.buffer)

        const reportsCSV = result.map((reportObj) => {
        
        if (!reportObj.category || !reportObj.urgency || !reportObj.message) {

            throw new Error('missing fields in csv file')
        }

        return {

            id: nanoid(),
            userId: req.payload.id,
            category: reportObj.category,
            urgency: reportObj.urgency,
            message: reportObj.message,
            imagePath: null,
            sourceType: 'csv file',
            createdAt: new Date().toDateString()
        }
    })

    const reportsData = JSON.parse(await fs.promises.readFile('data/reports.json', 'utf-8'))
    const newData = [...reportsData, ...reportsCSV]
    await fs.promises.writeFile('data/reports.json', JSON.stringify(newData))
        res.status(201).json({
            importedCount: reportsCSV.length,
            reports: reportsCSV

        })

    } catch (err) {

        if (err.message === 'missing fields in csv file') {

            return res.status(400).json({
                error: err.message
            })
        }

        res.status(500).json({

            error: err.message
        })
    }

})

report.get('/', authUser, async (req, res) => {

    const dataReports = JSON.parse(await fs.promises.readFile('data/reports.json', 'utf-8'))
    const dataUsers = JSON.parse(await fs.promises.readFile('data/users.json', 'utf-8'))
    const { category, urgency, agentCode } = req.query
    const { id ,role } = req.payload

    let resultData;

    if (!role === 'admin') {

        resultData = dataReports.filter((reportObj) => reportObj.userId === id)

    } else {

        if (category) {
            
            resultData = dataReports.filter((reportObj) => reportObj.category === category)
            
        }

        if (urgency) {

            resultData = dataReports.filter((reportObj) => reportObj.urgency === urgency)

        }

        if (agentCode) {

            const realAgent = dataUsers.filter((userObj) => userObj.agentCode === agentCode)
            const idAgent = realAgent[0].id
            resultData = dataReports.filter((reportObj) => reportObj.id === idAgent)
        }
    }

    res.status(200).json({

        reports: resultData

    })
})

report.get('/:id', authUser, async (req, res) => {

    const { id } = req.params
    const { payload } = req    

    const data = JSON.parse(await fs.promises.readFile('data/reports.json', 'utf-8'))
    const dataFiltered = data.filter((reportObj) => reportObj.id === id)

    if (dataFiltered.length === 0) {

        return res.status(404).json({

            message: 'wrong id',

        })

    }

    if (dataFiltered[0].userId !== payload.id) {

        return res.status(400).json({

            error: 'this is not your message'
        
        })
    }

    res.status(200).json({

        reports: dataFiltered

    })
})



export default report
