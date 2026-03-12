import express from 'express'
import authUser from '../middlewere/authUser.js'
import fs from 'fs'
import createPassword from '../utils/createPassword.js'
import { nanoid } from 'nanoid'
import { createHashPassword } from '../utils/hashPassword.js'


const admin = express.Router()

admin.post('/users', authUser, async (req, res) => {

    const {agentCode, fullName, role} = req.body
    let { password } = req.body
    const { payload } = req

    if (payload.role !== 'admin') {

        return res.status(403).json({

            error: 'Unauthorized you are not admin'

        })

    }

    if (role !== 'admin' && role !== 'agent') {

        return res.status(400).json({

            error: 'role can be admin or agent'

        })
    }

    const dataUsers = JSON.parse(await fs.promises.readFile('data/users.json', 'utf-8'))
    const findAgent = dataUsers.filter((userObj) => userObj.agentCode === agentCode)
    if (findAgent.length > 0){

        return res.status(409).json({

            error: 'agent code must be unique'

        })
    }


    if (!password) {

        password = createPassword(agentCode)

    }

    const hashedPass = createHashPassword(password)
    const createId = agentCode + nanoid()

    dataUsers.push({

        id: createId,
        agentCode,
        passwordHash: hashedPass,
        fullName,
        role

    })

    await fs.promises.writeFile('data/users.json', JSON.stringify(dataUsers))

    res.status(201).json({

        user: {

            id: createId ,
            agentCode,
            fullName,
            role,
            initialPasswordHint: password

        }
    })
})

admin.get('/users', authUser, async (req, res) => {

    if (payload.role !== 'admin') {

        return res.status(403).json({

            error: 'Unauthorized you are not admin'

        })

    }

    const data = JSON.parse(await fs.promises.readFile('data/users.json', 'utf-8'))

    res.status(200).json({

        users: data

    })
})

export default admin