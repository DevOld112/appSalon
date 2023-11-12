import Jwt from "jsonwebtoken"
import User from "../models/User.js"

const authMiddleware = async(req, res, next) => {
    

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

        try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = Jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select(
            "-password -verified -token -__v"
        )
        console.log(req.user)
        } catch (error) {
            res.status(403).json({msg:'Token Invalido'})
        }

        
    } else {
        const error = new Error('Token inexistente')
        res.status(403).json({msg: error.message})
    }


    next()
}

export default authMiddleware