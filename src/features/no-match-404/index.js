import { Typography } from "@material-ui/core";
import React from "react";
import { useLocation } from "react-router-dom";

const NoMatch404 = () => {
  let location = useLocation();

  return (
    <Typography variant="h4">
      No match for <code>{location.pathname}</code>
    </Typography>
  );
};

export default NoMatch404;
