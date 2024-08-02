import React from "react";
import { Toolbar, AppBar, Typography } from "@mui/material";
import Switch from "@mui/material/Switch";

const label = { inputProps: { "aria-label": "Switch demo" } };

const Header = ({}) => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">My TodoList</Typography>
        <Switch color="white" {...label} disabled defaultChecked />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
