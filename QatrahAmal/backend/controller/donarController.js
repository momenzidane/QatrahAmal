const asyncHandler= require('express-async-handler');
const {Donar} = require('../model')
const {regsterDonarValidate,loginDonarValidate}= require('../validation');

const jwt = require('jsonwebtoken');

const { hashSync,compare } = require("bcryptjs");

//@desc   Register a new donor
//@route  POST /api/donar
//@access Private
const registerDonar = asyncHandler(async (req, res, next) => {
    console.log(req.body);

    // Validation data
    const { error } = regsterDonarValidate.validate(req.body);
    if (error) {
        return next(createError(400, error.details[0].message));
    }

    // Check if email already exists
    const emailExists = await Donar.findOne({ email: req.body.email });
    if (emailExists) {
        return next(createError(400, 'The email already exists'));
    }

    // Hashing password
    const hashedPassword = hashSync(req.body.password, 10);  // Add salt rounds (e.g. 10 rounds) for 
    //  better security

    // Create a new donor
    const donor = await Donar.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        address: req.body.address,
        age: req.body.age,
        bloodType: req.body.bloodType,
        phone: req.body.phone,
        contOfDonar: 0,
        isAvailable: true,  // Add default availability
    });

    // Send response with token
    const token = generatToken(donor.id);
    return returnJson(res, 201, true, `Token: ${token} has been created`, donor);
});



//@desc   login doanr
//@route  POST /api/user
//@access public
const loginDonar =asyncHandler(async(req,res,next)=>{
    const {email,password} = req.body
    console.log(req.body);
    
     //validation data 
     const {error} = loginDonarValidate.validate(req.body)
     if (error) {
         return next(createError(400,error.details[0].message))
     }
 
     // check the email is exisist 
     const donar = await Donar.findOne({email})
     console.log(donar);
     
     if (donar && (await compare(password,donar.password))) {

        return returnJson(res, 200, true, `token: ${
            generatToken(donar.id)
        }`, donar);

     }
      return next(createError(400,'the email or password is not valid'))
})  


//@desc   get user data
//@route  GET /api/user
//@access Private
const getMe =asyncHandler(async(req,res,next)=>{
    
    console.log("Found Donar:", req.donar);

    const {_id,name,email,bloodType,age,phone,address} = await Donar.findById(req.donar.id)
    return returnJson(res, 200, true, `data of donar `, {_id,name,email,bloodType,age,phone,address});
})


// @desc   Get all available donors
// @route  GET /api/donors/available
// @access Private
const getAvailableDonors = asyncHandler(async (req, res, next) => {
    try {
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 6;
        let skip = (page - 1) * limit;

        
        let bloodTypeFilter = req.query.bloodType && req.query.bloodType !== "all" ? { bloodType: req.query.bloodType } : {};



        // Get total count based on filter
        const totalDonors = await Donar.countDocuments({ isAvailable: true, ...bloodTypeFilter });
        
        // Fetch donors with pagination and filter
        const donors = await Donar.find({ isAvailable: true, ...bloodTypeFilter })
            .skip(skip)
            .limit(limit);

        if (!donors.length) {
            return returnJson(res, 404, false, "No available donors found.", []);
        }

        return returnJson(res, 200, true, "Available donors list", {
            donors,
            totalDonors,
            totalPages: Math.ceil(totalDonors / limit),
            currentPage: page
        });

    } catch (error) {
        return next(error);
    }
});


// @desc   Update donor availability status
// @route  PUT /api/donors/update-availability
// @access Private
// const updateDonorAvailability = asyncHandler(async (req, res, next) => {
//     try {
//         // الحصول على الـ ID من التوكن
//         const donorId = req.donar._id;

//         // جلب المتبرع من قاعدة البيانات باستخدام الـ ID
//         const donor = await Donar.findById(donorId);

//         if (!donor) {
//             return returnJson(res, 404, false, "Donor not found.", []);
//         }

//         // التحقق إذا كان هناك متغير توفّر (availability) في الجسم (body) من الطلب
//         if (req.body.isAvailable === undefined) {
//             return returnJson(res, 400, false, "Please specify availability status.", []);
//         }

//         // تحديث حالة التوفر
//         donor.isAvailable = req.body.isAvailable;

//         // حفظ التغييرات
//         await donor.save();

//         return returnJson(res, 200, true, "Donor availability updated successfully.", {
//             donor
//         });

//     } catch (error) {
//         return next(error);
//     }
// });

// @desc   Get user data or update availability status
// @route  GET/PUT /api/donors/me
// @access Private
const getMeOrUpdateAvailability = asyncHandler(async (req, res, next) => {
    try {
        const donorId = req.donar._id;

        // إذا كان الطلب من نوع GET، نقوم فقط بإرجاع بيانات المتبرع
        if (req.method === 'GET') {
            console.log("Found Donor:", req.donar);
            
            const { _id, name, email, bloodType, age, phone, address } = await Donar.findById(donorId);
            return returnJson(res, 200, true, "Data of donor", { _id, name, email, bloodType, age, phone, address });
        }

        // إذا كان الطلب من نوع PUT، نقوم بتحديث حالة التوفر
        if (req.method === 'PUT') {
            const donor = await Donar.findById(donorId);

            if (!donor) {
                return returnJson(res, 404, false, "Donor not found.", []);
            }

            // التحقق إذا كان هناك متغير توفّر (availability) في الجسم (body) من الطلب
            if (req.body.isAvailable === undefined) {
                return returnJson(res, 400, false, "Please specify availability status.", []);
            }

            // تحديث حالة التوفر
            donor.isAvailable = req.body.isAvailable;

            // حفظ التغييرات
            await donor.save();

            return returnJson(res, 200, true, "Donor availability updated successfully.", donor);
        }

    } catch (error) {
        return next(error);
    }
});


const generatToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"30d"
    })
}

module.exports = {
    registerDonar,loginDonar,getMe,getAvailableDonors,getMeOrUpdateAvailability
}