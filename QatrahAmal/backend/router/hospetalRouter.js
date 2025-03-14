const express = require('express');

const router = express.Router()

const {getMe,loginHospetal,registerHospetal} = require('../controller/hospetalController')
const { protect} =require('../middleware/hospetalMiddleware')


router.route('/register').post(registerHospetal)
router.route('/login').post(loginHospetal)
router.route('/me').get(protect,getMe)

module.exports = router