import React from 'react';
import CircularProgress from "@material-ui/core/CircularProgress";

import styles from "./Preloader.module.sass";

const Preloader = () => {
  return (
    <div className={styles['preloader-container']}>
      <CircularProgress />
    </div>
  )
};

export default Preloader;