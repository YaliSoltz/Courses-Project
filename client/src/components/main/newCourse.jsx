import axios from "axios";
import React, { Fragment } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../helpers/userContext";
import { Paper, Box } from "@mui/material";

const NewCourse = () => {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const { user, token, courseSubject } = useContext(UserContext);
  let user_id = user.user_id;
  let subject_id = courseSubject.subject_id;
  const url = "http://localhost:4000/api/cyberPro/Courses";

  // func that add new course
  const newCourse = async () => {
    // loop that check if you already registered for this course
    if (user.courses) {
      for (let i = 0; i < user.courses.length; i++) {
        if (user.courses[i].subject_id == subject_id) {
          return setShow(true), alert("you already registered for this course");
        }
      }
    }
    await axios.post(
      url,
      { user_id, subject_id },
      { headers: { "x-auth-token": token } }
    );
    alert("course added");
    navigate("/myCourses");
  };

  return (
    <Box
      display="flex"
      height="600px"
      alignItems="center"
      justifyContent="center"
    >
      <Box width="60%">
        <Paper className="paper">
          <h2>course name: {courseSubject.subject}</h2>
          <h3>rating: {courseSubject.rating} </h3>
          <h3>level: {courseSubject.level} </h3>
          <h3>about:</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem
            possimus voluptas temporibus aut numquam sint, repellendus eos esse,
            quibusdam minus odit amet dolores tempora quae assumenda quisquam
            quod, nesciunt officia?
          </p>
          <div
            class="alert alert-primary"
            role="alert"
            hidden={show}
            style={{ textAlign: "center", width: 400, margin: "auto" }}
          >
            <h2>are ou sure?</h2>
            <span>
              <button
                className="btn btn-success m-1"
                onClick={() => {
                  newCourse();
                }}
              >
                yes
              </button>
              <button
                className="btn btn-danger m-1"
                onClick={() => setShow(true)}
              >
                no
              </button>
            </span>
          </div>
          <button
            style={{ bottom: 70.5, position: "absolute" }}
            className="register_course"
            onClick={() => setShow(false)}
          >
            register
          </button>
        </Paper>
      </Box>
    </Box>
  );
};

export default NewCourse;
