import React from 'react'
import PropTypes from 'prop-types'
import Moment from "react-moment";
import {Link} from "react-router-dom";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

import "./IssueItem.sass"


const IssueItem = props => {
  const {id, title, created_at, state} = props;

  return (
    <div className="item">
      <div className="icon-container">
        {state === "open" ?
          <Tooltip title="Open">
            <span><ErrorOutlineIcon className={`state ${state}`}/></span></Tooltip> :
          <Tooltip title="Closed"><span><HighlightOffIcon className={`state ${state}`}/></span></Tooltip>
        }
      </div>
      <div className="item-info">
        <Typography gutterBottom variant="subtitle1">
          <Link to={`/issue/${id}`}>{title}</Link>
        </Typography>
        <Typography variant="body2" color="textSecondary">
          #{id} created at <Moment locale='ru' format="DD MMM YYYY">{created_at}</Moment>
        </Typography>
      </div>
    </div>
  );
};

IssueItem.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  created_at: PropTypes.string,
};

export default IssueItem;
