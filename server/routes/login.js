const bcrypt = require("bcrypt");
const { Router } = require("express");
const db = require("../models/db");
const { loginSchema } = require("../models/loginSchema");
const router = Router();
const { generateJWT } = require("../models/userSchema");

router.post("/", async (req, res) => {
  const body = req.body;

  // Joi validate
  let { error } = loginSchema.validate(body);
  if (error) return res.status(400).send(error.message);

  const { email, password } = body;
  let query = `
  SELECT * FROM users 
  WHERE email = '${email}'
  `;

  // check if email exist
  try {
    const result = await db.query(query);
    if (result.rowCount === 0)
      return res.status(400).send("Invalid email or password.");
    else user = result.rows[0]; //define the user
  } catch (error) {
    return res.status(400).send(error.essage);
  }

  let token;
  const valiedPassword = await bcrypt.compare(password, user.password); // check if password is correct
  if (valiedPassword) token = generateJWT(user); // define the token
  token ? res.send(token) : res.status(400).send("Invalid email or password.");
});

module.exports = router;
