const express = require('express');

const router = express.Router()

const {getMe,loginDonar,registerDonar,getAvailableDonors,getMeOrUpdateAvailability} = require('../controller/donarController')
const { protect} =require('../middleware/donarMiddleware')


router.route('/regisiter').post(registerDonar)
router.route('/login').post(loginDonar)
router.route('/getAvailableDonors').get(getAvailableDonors)

// router.route('/me').get(protect,getMe)


router.route('/me')
    .get(protect, getMeOrUpdateAvailability)  // للحصول على بيانات المتبرع
    .put(protect, getMeOrUpdateAvailability); // لتحديث حالة التوفر

module.exports = router