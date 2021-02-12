import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import {Link} from "react-router-dom";
import {Header} from "../../components";

const Index = ({match}) => {
  const id = match.params.id;
  return (
    <>
      <Header>
        <Link to={"/"}>
          <IconButton component="span" style={{color: '#ffffff'}}>
            <KeyboardBackspaceIcon/>
          </IconButton>
        </Link>
        Issue #{id}</Header>
      <div>
        Issue {id}
      </div>
    </>
  )
};

export default Index;