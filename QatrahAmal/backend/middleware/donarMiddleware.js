const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler');
const Donar = require('../model/DonarModel');

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
            console.log("Decoded Token:", decoded);
            // req.doanr = await Donar.findById(decoded.id).select('-password')
            const donar = await Donar.findById(decoded.id).select('-password');
            console.log("Database Query Result:", donar);
            req.donar = donar;

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