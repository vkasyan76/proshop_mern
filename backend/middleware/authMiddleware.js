import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'

const protect = asyncHandler(async(req, res, next) => {
    let token
        // console.log(req.headers.authorization)
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        // console.log('token found')
        try {
            token = req.headers.authorization.split(' ')[1]
                // console.log(token)
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
                // console.log(decoded)
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not Authorized, token failed')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }

    // next()
})

export { protect }