const { Router } = require("express");
const db = require("../models/db");
const router = Router();

//get all the courses
router.get("/", async (req, res) => {
  let query = `
    SELECT * FROM courses
    ORDER BY course_id
    `;
  let result = await db.query(query);
  res.status(200).send(result.rows);
});

//add new course
router.post("/", async (req, res) => {
  const body = req.body;
  let { user_id, subject_id } = body;
  let subject = ""; // subject name
  let courseNumber = 1; // number of the course
  let course_name = ""; // name of the course

  //check if the student already registered for this course
  try {
    let query = `
  SELECT * FROM courses
  WHERE user_id = ${user_id} AND subject_id = ${subject_id}
  `;
    let result = await db.query(query);
    if (result.rowCount > 0)
      return res
        .status(400)
        .send("this student is already registered for this course");
  } catch (error) {
    return res.status(400).send(error.message);
  }

  //define subject
  try {
    // getting subject name
    let query = `
        SELECT subject FROM subjects 
        WHERE subject_id = ${subject_id}
      `;

    let result = await db.query(query);
    subject = result.rows[0].subject; //define subject name
  } catch (error) {
    return res.status(400).send(error.message);
  }

  // loop that checks which course is not full(22)
  while (true) {
    course_name = subject + courseNumber; // define cours name
    let query = `
    SELECT COUNT(*) FROM courses 
    WHERE course_name = '${course_name}'
   `;
    let result = await db.query(query);
    if (result.rows[0].count == 22) courseNumber++;
    else break;
  }

  // add new course
  try {
    let query = `
       INSERT INTO courses (course_name, user_id, subject_id) VALUES ($1, $2, $3) RETURNING *
     `;

    let values = [course_name, user_id, subject_id];
    let result = await db.query(query, values);
    res.status(201).send(result.rows[0]);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// delete student from course
router.delete("/", async (req, res) => {
  const body = req.body;
  let { user_id, subject_id } = body;
  let query = `
  DELETE FROM courses
  WHERE user_id = ${user_id} AND subject_id = ${subject_id} RETURNING *
  `;
  try {
    let result = await db.query(query);
    if (result.rowCount === 0)
    return res
      .status(400)
      .send("this student is not registered for this course");
  else
    res
      .status(201)
      .send(`student removed from ${result.rows[0].course_name} course`);
  } catch (error) {
    res.status(400).send(error.message)
  }
  
});

module.exports = router;
