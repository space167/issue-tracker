import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import styles from './IssueItem.module.sass'

const IssueItem = ({id, title, created_at, state, url, index}) => {
  const url_issue = url.replace("https://api.github.com/repos", "");

  return (
    <Zoom in={true}
          style={{
            transitionDelay: `${index * 50}ms`,
          }}
    >
      <div className={styles["item"]}>
        <div className={styles["icon-container"]}>
          {state === "open" ?
            <Tooltip title="Open">
              <span><ErrorOutlineIcon className={`${styles["state"]} ${styles[state]}`}/></span></Tooltip> :
            <Tooltip title="Closed"><span><HighlightOffIcon className={`${styles["state"]} ${styles[state]}`}/></span></Tooltip>
          }
        </div>
        <div className={styles["item-info"]}>
          <Typography gutterBottom variant="subtitle1" style={{lineHeight: "30px"}}>
            <Link to={url_issue}>{title}</Link>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            #{id} created at <Moment locale="ru" format="DD MMM YYYY">{created_at}</Moment>
          </Typography>
        </div>
      </div>
    </Zoom>
  );
};

IssueItem.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  created_at: PropTypes.string,
  state: PropTypes.string,
  url: PropTypes.string,
  index: PropTypes.number,
};

export default IssueItem;
