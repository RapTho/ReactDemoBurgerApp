import React, { useState } from "react";
import { connect } from "react-redux";

import classes from "./Layout.css";
import Aux from "../Auxiliary/Auxiliary";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const layout = (props) => {
  const [isSideDrawerVisible, setIsSideDrawerVisible] = useState(false);

  const hideSideDrawerHandler = () => {
    setIsSideDrawerVisible(false);
  };

  const showSideDrawerHandler = () => {
    setIsSideDrawerVisible(!isSideDrawerVisible);
  };

  return (
    <Aux>
      <Toolbar
        showSideDrawer={showSideDrawerHandler}
        isAuth={props.isAuthenticated}
      />
      <SideDrawer
        show={isSideDrawerVisible}
        click={hideSideDrawerHandler}
        isAuth={props.isAuthenticated}
      />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};

const mapStateToPros = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToPros)(layout);
