import { Box } from "@mui/material";
import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import img from "../../helpers/images/dragon.png";
import { UserContext } from "../../helpers/userContext";
import SideBar from "../sideBar";
import MyCourse from "./myCourse";
const MyCourses = () => {
  const { course } = useContext(UserContext);
  return (
    <Box display="flex">
      <Box >
        <SideBar />
      </Box>
      <Box flexBasis="100%" display="flex" justifyContent="center">
        <Box width="60%">
          {course ? (
            <MyCourse />
          ) : (
           <div style={{paddingLeft: 300}}><img src={img} alt="error" style={{ width: 400, height: 400 }} /></div>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default MyCourses;
