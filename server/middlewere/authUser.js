import jwt from 'jsonwebtoken'

function authUser(req, res, next) {

    const auth = req.header('Authorization')
    
    if (!auth) {

        return res.status(401).json({

            error: 'Ubauthorized'

        })
    }    

    const partAuth = auth.split(' ')

    if (partAuth[0] !== 'Bearer' || partAuth.length !== 2) {

        return res.status(401).json({

            error: 'Ubauthorized'

        })
    }

    const isMatch = jwt.verify(partAuth[1], process.env.PRIVATE_KEY)    

    if (!isMatch) {

        return res.status(403).json({

            error: 'Ubauthorized'

        })
    }
    

    req.payload = isMatch['user'] 
     
      

    next()
}

export default authUser