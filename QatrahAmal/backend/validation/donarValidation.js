const Joi = require('@hapi/joi');

const schemaR = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    address: Joi.string().required(),
    age: Joi.number().min(18).required(),
    bloodType: Joi.string().valid('O+', 'A+', 'B+', 'AB+', 'O-', 'A-', 'B-', 'AB-').required(),
    phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    contOfDonar: Joi.number().min(0).default(0),
    isAvailable: Joi.boolean().default(true),  
    lastDonationDate: Joi.date().optional(),  
    donationHistory: Joi.array().items(Joi.string()).optional()
});
const schemaL = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required()
})

module.exports = {
    schemaR,schemaL
}