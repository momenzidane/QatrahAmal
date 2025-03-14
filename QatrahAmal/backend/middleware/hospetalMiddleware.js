const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler');
const {Hospetal} = require('../model');

const protect = asyncHandler(async (req,res,next)=>{
    let token 

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //get token from header 
            token = req.headers.authorization.split(' ')[1]

            //Verify token 
            const decoded = jwt.verify(
                token , process.env.JWT_SECRET
            )
            req.hospetal = await Hospetal.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.log(error);
            console.log('not authorize');
            
            return next(createError(401,error.details[0].message))
        }
    }
    if (!token) {
        return next(createError(401,'no authorize , no token '))
    }
})

module.exports = {protect}