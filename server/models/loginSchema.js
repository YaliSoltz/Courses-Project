const Joi = require("joi");

// Joi login schema
const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
      .required(),
  
    password: Joi.string().min(1).max(255).required()
  
  });

module.exports.loginSchema = schema;