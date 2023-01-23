const Joi = require('joi');

let schema = Joi.object({
    email: Joi.string().email({minDomainSegments: 2, tlds: {allow: ['com']}}).required(),
    newPassword: Joi.string().min(1).max(255).required(),
    newPassword2: Joi.ref('newPassword')
})

module.exports.newPasswordSchema = schema