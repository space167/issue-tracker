import React from 'react'
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

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

Header.propTypes = {
  children: PropTypes.array.isRequired,
};

export default Header
