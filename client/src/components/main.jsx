import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./main/home";
import MyCourses from "./main/myCourses";
import NewCourse from "./main/newCourse";

const Main = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newCourse" element={<NewCourse />} />
        <Route path="/myCourses" element={<MyCourses />} />
      </Routes>
    </Fragment>
  );
};

export default Main;
