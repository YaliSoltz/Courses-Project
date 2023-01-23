import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

export const UserContext = createContext();
const User = (props) => {
  const { children } = props;
  const [user, setUser] = useState({}); // user who signed in
  const [subjects, setSubjects] = useState([]); // all the subjects
  const [courseSubject, setCourseSubject] = useState({}); // new course adding
  const [course, setCourse] = useState(); // the course that viewd
  let token = localStorage.getItem("x-auth-token"); // get the token from the local storage
  // func that define the user
  const defineUser = async () => {
    let decoded = jwt_decode(token); // decode the token into an object
    const url = `http://localhost:4000/api/cyberPro/userCourses/${decoded.user_id}`;
    let { data } = await axios.get(url, { headers: { "x-auth-token": token } });
    if (data.length > 0) {//set the user with: name, user_id and array of courses
      setUser({ ...decoded, courses: data });
    } 
    else  setUser(decoded);
  };

  // func that get all the subjects
  const getSubjects = async () => {
    const url = "http://localhost:4000/api/cyberPro/subjects";
    let { data } = await axios.get(url);
    setSubjects(data);
  };

  // func that delete user from a course
  const deleteCourse = async (subject_id) => {
    const url = "http://localhost:4000/api/cyberPro/courses";
    await axios.delete(url, {
      data: { user_id: user.user_id, subject_id },
      headers: { "x-auth-token": token },
    });
  };

  useEffect(() => {
    if (token) defineUser();
    getSubjects();
  }, [deleteCourse]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        token,
        deleteCourse,
        subjects,
        courseSubject,
        setCourseSubject,
        course,
        setCourse,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default User;
