import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import {Link} from "react-router-dom";
import {Header} from "../../components";

import styles from './Issue.module.sass'
import Paper from "@material-ui/core/Paper";
import Moment from "react-moment";

let data = {
  id: "213213321",
  title: "Bug: Native multiple only change value on second click on Firefox",
  created_at: "2021-02-12T07:22:04Z",
  closed_at: null,
  state: "closed",
};

const Index = ({match}) => {
  // const id = match.params.id;
  const {id, title, created_at, state} = data;
  return (
    <>
      <Header>
        <Link to={"/"}>
          <IconButton component="span" style={{color: '#ffffff'}}>
            <KeyboardBackspaceIcon/>
          </IconButton>
        </Link>
        Issue <span className={'id-task'}>#{id}</span>
      </Header>
      <Paper  className={styles["issues-container"]}>
        <h2>{title}</h2>
        <h4 className={styles['subtitle']}>
          <span className={`state ${styles[state]}`}>{state}</span> created at <Moment locale='ru' format="DD MMM YYYY">{created_at}</Moment></h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam beatae commodi consequuntur corporis, cum
          delectus dolor dolorem doloremque eaque eum expedita id inventore libero minus molestiae molestias obcaecati
          quae quidem quod sit tenetur veniam vero voluptates. Aliquid corporis dicta doloremque explicabo nobis, quod
          rem
          rerum sit voluptatum? Numquam tempore, ullam.
        </p>
      </Paper>
    </>
  )
};

export default Index;