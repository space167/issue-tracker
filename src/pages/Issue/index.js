import React, {useEffect} from 'react';
import IconButton from "@material-ui/core/IconButton";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import {Link} from "react-router-dom";
import Markdown from 'markdown-to-jsx';
import Paper from "@material-ui/core/Paper";
import Moment from "react-moment";
import {useDispatch, useSelector} from "react-redux";
import issueActions from "../../redux/actions/issue";
import Skeleton from "@material-ui/lab/Skeleton";
import {Header} from "../../components";

import styles from './Issue.module.sass'

const Index = ({match}) => {
  const {id, organization, repository} = match.params;
  const dispatch = useDispatch();
  const {item, isLoading} = useSelector(({issues, issue}) => {
    return {
      isLoading: issue.isLoading,
      item: issue.item,
    }
  });

  useEffect(() => {
    dispatch(issueActions.fetchItem(organization, repository, id))
  }, [dispatch, organization, repository, id]);

  return (
    <>
      <Header>
        <Link to={"/"}>
          <IconButton component="span" style={{color: '#ffffff'}}>
            <KeyboardBackspaceIcon/>
          </IconButton>
        </Link>
        Issue <span className={'id-task'}>#{item && item.id}</span>
      </Header>
      <Paper className={styles["issues-container"]}>
        {isLoading ? <div className="loaded">
            <Skeleton style={{height: '50px'}}/>
            <div style={{
              display: 'flex', alignItems: 'center'
            }}><Skeleton
              style={{borderRadius: '20px', width: '80px', height: '63px'}}
            /> <Skeleton style={{height: '30px', width: '170px', marginLeft: '10px'}}/>
            </div>
            <Skeleton variant="rect" style={{height: '200px'}}/>
          </div>
          :
          <div className={"content"}>
            <h2>{item && item.title}</h2>
            <h4 className={styles['subtitle']}>
              <span
                className={`state ${styles[item && item.state]}`}>{item && item.state}</span> created
              at <Moment
              locale='ru'
              format="DD MMM YYYY">{item && item.created_at}</Moment>
            </h4>
            {item && item.body && <Markdown>{item.body}</Markdown>}
          </div>
        }
      </Paper>
    </>
  )
};

export default Index;