import React from 'react';
import styles from "./Preloader.module.sass";
import CircularProgress from "@material-ui/core/CircularProgress";

const Preloader = ({}) => {
  return (
    <div className={styles['preloader-container']}>
      <CircularProgress />
    </div>
  )
};

export default Preloader;