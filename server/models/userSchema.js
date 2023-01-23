const jwt = require("jsonwebtoken");
const Joi = require("joi");

// func that takes user id + name and generate it to jwt
function generateJWT(user) {
  const token = jwt.sign(
    { user_id: user.user_id, name: user.name },
    "dan and yali"
  );
  return token;
}

// Joi user schema
const schema = Joi.object({
  name: Joi.string().min(1).max(255).required(),

  password: Joi.string().min(1).max(255).required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
    .required(),
});

module.exports.userSchema = schema;
module.exports.generateJWT = generateJWT;
