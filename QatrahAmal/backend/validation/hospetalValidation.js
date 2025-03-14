const Joi = require('@hapi/joi');

const schemaRH = Joi.object({
    name:Joi.string().required(),
    email:Joi.string().email().required(),
    password : Joi.string().required(),
    Screetkey : Joi.string().required()
})

const schemaLH = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required()
})

module.exports = {
    schemaRH,schemaLH
}