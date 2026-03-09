import express from 'express'
import cors from 'cors'
import auth from './routes/auth.js'
import report from './routes/reports.js'


const app = express()
app.use(cors())
app.use(express.json())
app.use('/auth', auth)
app.use('/reports', report)


app.listen(3003, () => {

    console.log('start running server');
    
})