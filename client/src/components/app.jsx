import React, { Fragment } from "react";
import Header from "./header";
import Main from "./main";
import SideBar from "./sideBar";
import { Box } from "@mui/material";

const App = () => {
  return (
    <Fragment>
      <Header />
      <Main />
    </Fragment>
  );
};

export default App;
