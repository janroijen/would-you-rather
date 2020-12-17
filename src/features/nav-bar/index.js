import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectAuthedUser, logout } from "../../store/usersSlice";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const NavBar = () => {
  const dispatch = useDispatch();
  const authedUser = useSelector(selectAuthedUser);
  const [tabIndex, setTabIndex] = useState(0);
  const history = useHistory();

  const handleTabChange = (e, newValue) => {
    setTabIndex(newValue);
    switch (newValue) {
      case 0:
        history.push("/home");
        break;
      case 1:
        history.push("/add");
        break;
      case 2:
        history.push("leaderboard");
        break;
      default:
        history.push("/home");
    }
  };

  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <Tabs value={tabIndex} onChange={handleTabChange} centered>
      <Tab label="Home" />
      <Tab label="New Question" />
      <Tab label="Leaderboard" />
      <Tab label="Logout" onClick={handleLogOut} />
      <Tab label={authedUser.name} disabled />
    </Tabs>
  );
};

export default NavBar;
