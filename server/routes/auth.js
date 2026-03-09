import express from 'express'
import fs from 'fs'
import authUser from '../middlewere/authUser.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const auth = express.Router()

auth.post('/login', async (req, res) => {

    const { agentCode, password } = req.body

    if (!agentCode || !password) {

        res.status(400).json({

            error: 'missing field'

        })
    }

    const data = JSON.parse(await fs.promises.readFile('data/users.json'))
    const result = data.filter((user) => user.agentCode === agentCode && user.passwordHash === password)

    if (result.length === 0) {

        return res.status(401).json({

            message: 'user not found'
        
        })
    }
    const user = {

        id: result[0].id, 
        agentCode, 
        fullName: result[0].fullName, 
        role: result[0].role
    
    }

    const token = jwt.sign({user}, process.env.PRIVATE_KEY, {expiresIn: '1h'})

    res.status(201).json({

        token,
        user

    })
})

auth.get('/me', authUser,(req, res) => {

    const { user } = req.payload

    res.status(200).json({

        user

    })

})


export default auth