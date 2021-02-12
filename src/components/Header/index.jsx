import React from 'react'
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";

const Header = ({children}) => {
  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography variant="h6" noWrap>
          {children}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header