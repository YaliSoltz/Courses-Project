import { Box, Paper } from "@mui/material";
import React, { Fragment } from "react";
import { useContext } from "react";
import { UserContext } from "../../helpers/userContext";

const MyCourse = () => {
  const { course } = useContext(UserContext);

  return (
    <Box
      display="flex"
      height="600px"
      alignItems="center"
      justifyContent="center"
    >
      <Box width="100%">
        <Paper className="paper">
          <h2 className="course_name">{course.subject}</h2>
          <h4>about: <span style={{fontWeight: 16}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum saepe suscipit quibusdam blanditiis! Ex corporis, nulla deserunt, obcaecati porro vero ducimus similique ipsam fugiat perferendis optio rem ipsa hic praesentium impedit. Quo, illum ullam vel quasi explicabo dolores suscipit unde numquam ratione, modi debitis dicta voluptatum ipsam sit cum non alias totam soluta ea blanditiis fugit vitae eos. Id, vitae?</span></h4>
        </Paper>
      </Box>
    </Box>
  );
};

export default MyCourse;
