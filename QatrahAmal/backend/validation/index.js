const {schemaL,schemaR} = require('./donarValidation')
const {schemaLH,schemaRH} = require('./hospetalValidation')

module.exports ={
    regsterDonarValidate:schemaR,
    loginDonarValidate: schemaL,
    regsterHospetalValidate: schemaRH,
    loginHospetalValidate: schemaLH,
}