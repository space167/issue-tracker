import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Markdown from 'markdown-to-jsx';
import Moment from 'react-moment';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Skeleton from '@material-ui/lab/Skeleton';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Alert from "@material-ui/lab/Alert";

import issueActions from '../../redux/actions/issue';
import {Header} from '../../components';
import './Issue.sass'

const Issue = ({match}) => {
  const {id, organization, repository} = match.params;
  const dispatch = useDispatch();
  const {item, isLoading, error, page} = useSelector(({issue, issues}) => {
    return {
      isLoading: issue.isLoading,
      item: issue.item,
      error: issue.error,
      page: issues.page ? issues.page : 1,
    }
  });

  useEffect(() => {
    dispatch(issueActions.fetchItem(organization, repository, id))
  }, [dispatch, organization, repository, id]);

  return (
    <>
      <Header>
        <Link to={`/${organization}/${repository}/issues/page/${page}`}>
          <IconButton component="span" style={{color: '#ffffff'}}>
            <KeyboardBackspaceIcon/>
          </IconButton>
        </Link>
        Issue <span className={'id-task'}>#{item && item.id}</span>
      </Header>
      <Paper className={"issues-container"}>
        {isLoading ? <div className="loaded">
            <Skeleton style={{height: "50px"}}/>
            <div style={{
              display: "flex", alignItems: "center"
            }}><Skeleton
              style={{borderRadius: "20px", width: "80px", height: "63px"}}
            /> <Skeleton style={{height: "30px", width: "170px", marginLeft: "10px"}}/>
            </div>
            <Skeleton variant="rect" style={{height: "200px"}}/>
          </div>
          : error ? <Alert severity="error">{error}</Alert> : <div className={"content"}>
            <h2>{item && item.title}</h2>
            <h4 className={"subtitle"}>
              <span
                className={`state ${item && item.state}`}>{item && item.state}</span> created
              at <Moment
              locale="ru"
              format="DD MMM YYYY">{item && item.created_at}</Moment>
            </h4>
            {item && item.body && <Markdown>{item.body}</Markdown>}
          </div>
        }
      </Paper>
    </>
  )
};

Issue.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
      organization: PropTypes.string.isRequired,
      repository: PropTypes.string.isRequired,
    })
  }),
};

export default Issue;