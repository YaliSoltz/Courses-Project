const { Router } = require("express");
const db = require("../models/db");
const router = Router();

//get all the user courses
router.get("/:id", async (req, res) => {
  let user_id = parseInt(req.params.id);
  let query = `
  SELECT  subjects.subject_id, subject, rating, level, img  FROM courses
  INNER JOIN subjects
  ON courses.subject_id = subjects.subject_id
  WHERE user_id = ${user_id}
  ORDER BY course_id
       
    `;
  try {
    let { rows } = await db.query(query);
    res.status(200).send(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
