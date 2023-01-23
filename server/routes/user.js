const { Router } = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const db = require("../models/db");
const { userSchema } = require("../models/userSchema");
const { newPasswordSchema } = require("../models/newPassSchema");
const router = Router();

// get all users
router.get("/", async (req, res) => {
  const query = `
  SELECT * FROM users
  `;
  try {
    const { rows } = await db.query(query);
    res.status(200).send(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// add new user
router.post("/", async (req, res) => {
  const body = req.body;

  // Joi validate
  let { error } = userSchema.validate(body);
  if (error) return res.status(400).send(error.message);

  let { name, email, password } = body;
  let query = `
  SELECT * FROM users
  WHERE email = '${email}'
  `;

  //check if the email exist
  try {
    let { rows } = await db.query(query);
    if (rows.length > 0) return res.status(400).send("user already exist");
  } catch (error) {
    return res.status(400).send(error.message);
  }

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt); // hashing the password

  query = `
INSERT INTO users (name,  email, password) VALUES ($1, $2, $3) RETURNING *
`;
  const values = [name, email, password];

  //adding new student with name, email and password
  try {
    let { rows } = await db.query(query, values);
    res.status(201).send(_.pick(rows[0], ["name", "email"]));
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// change user password
router.put('/', async(req, res) => {
  const body = req.body;
  let {error} = newPasswordSchema.validate(body)
  if(error) return res.status(400).send(error.message)

  let {email, newPassword} = body
  const salt = await bcrypt.genSalt(10);
  newPassword = await bcrypt.hash(newPassword, salt); // hashing the password

  let query = `
  UPDATE users
  SET password = '${newPassword}'
  WHERE email = '${email}'
  `
  let result = db.query(query)
  res.status(201).send(result)

});

//get by email
router.get("/getByEmail/:email", async (req, res) => {
  const email = req.params.email;
  let query = `
  SELECT * FROM users
  WHERE email = '${email}'
  `;

  //check if already email exist
  try {
    let { rows } = await db.query(query);
    if (rows.length === 0) res.status(400).send("email does not exist");
    else res.status(200).send(rows[0]);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//get by user_id
router.get("/getById/:id", async (req, res) => {
  const id = req.params.id;
  let query = `
  SELECT * FROM users
  WHERE user_id = ${id}
  `;

  //check if the user_id exist
  try {
    let { rows } = await db.query(query);
    if (rows.length === 0) res.status(400).send("id does not exist");
    else res.status(200).send(rows[0]);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
