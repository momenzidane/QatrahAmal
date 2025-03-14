const asyncHandler= require('express-async-handler');
const {Hospetal} = require('../model')
const {regsterHospetalValidate,loginHospetalValidate}= require('../validation');

const jwt = require('jsonwebtoken');

const { hashSync,compare } = require("bcryptjs");

//@desc   regester a new hospital
//@route  POST /api/donar
//@access Private
const registerHospetal =asyncHandler(async(req,res,next)=>{
      // Log the request body (optional)
      console.log(req.body);

      // Validate the input data
      const { error } = regsterHospetalValidate.validate(req.body);
      if (error) {
          return next(createError(400, error.details[0].message));
      }
  
      // Check if the provided Screetkey is valid
      const screetkey = process.env.SCREETKEY;
      if (req.body.Screetkey !== screetkey) {
          return next(createError(400, 'The Screetkey is incorrect.'));
      }
  
      // Check if the hospital email already exists
      const emailExists = await Hospetal.findOne({ email: req.body.email });
      if (emailExists) {
          return next(createError(400, 'The email already exists.'));
      }
  
      // Hash the password
      const hashPassword = hashSync(req.body.password, 10); // 10 rounds for hashing
  
      // Create a new hospital
      const hospetal = await Hospetal.create({
          name: req.body.name,
          email: req.body.email,
          password: hashPassword,
      });
      
    return returnJson(res, 201, true, `token: ${generatToken(hospetal.id)} has been created`, hospetal);
})


//@desc   login Hospetal
//@route  POST /api/hospetal
//@access public
const loginHospetal =asyncHandler(async(req,res,next)=>{
    const {email,password} = req.body
    console.log(req.body);
    
     //validation data 
     const {error} = loginHospetalValidate.validate(req.body)
     if (error) {
         return next(createError(400,error.details[0].message))
     }
 
     // check the email is exisist 
     const hospetal = await Hospetal.findOne({email})
     console.log(hospetal);
     
     if (hospetal && (await compare(password,hospetal.password))) {

        return returnJson(res, 200, true, `token: ${
            generatToken(hospetal.id)
        }`, hospetal);

     }
      return next(createError(400,'the email or password is not valid'))
})  


//@desc   get Hospetal data
//@route  GET /api/user
//@access Private
const getMe =asyncHandler(async(req,res,next)=>{
    const {_id,name,email} = await Hospetal.findById(req.hospetal.id)
    return returnJson(res, 200, true, `data of hospetal `, {_id,name,email});
})





const generatToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"30d"
    })
}

module.exports = {
    registerHospetal,loginHospetal,getMe
}