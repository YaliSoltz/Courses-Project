const { Router } = require("express");
const db = require("../models/db");
const router = Router();

// get all subjects
router.get("/", async (req, res) => {
  const query = `
  SELECT * FROM subjects
  ORDER BY subject_id
  `;
  try {
    const { rows } = await db.query(query);
    res.status(200).send(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
    
// post
router.post('/', async (req, res)=> {
  res.send('POST request to the homepage')
})
module.exports = router;
