import React, {useState} from 'react';
import {useMediaQuery} from 'react-responsive'
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Pagination from "@material-ui/lab/Pagination";
import SearchIcon from '@material-ui/icons/Search';
import GitHubIcon from '@material-ui/icons/GitHub';

import issueActions from "../../redux/actions/issues";
import Preloader from "../../components/Preloader/Preloader";
import {Header, IssueItem} from "../../components";
import "./Issues.sass"
import Alert from "@material-ui/lab/Alert";


const useStyles = makeStyles((theme) => ({
  pagination: {
    display: 'inline-block',
    marginLeft: 'auto',
    marginRight: 'auto',
    '& > *': {
      display: 'inline-block',
      marginTop: theme.spacing(2),
    },
  },
  search: {
    display: 'grid',
    gridTemplateColumns: '5fr 1fr 5fr 1fr',
    padding: '2px 4px',
    alignItems: 'center',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    textAlign: 'center',
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const Issues = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const {isLoading, error, items, page, pages, countIssues, ...current} = useSelector(({issues}) => (issues));
  const [organization, setOrganization] = useState(current.organization ? current.organization : "");
  const [repository, setRepository] = useState(current.repository ? current.repository : "");

  const isSmall = useMediaQuery({query: '(max-width: 399px)'});
  const isMedium = useMediaQuery({query: '(min-width: 400px) and (max-width: 599px)'});
  const isLarge = useMediaQuery({query: '(min-width: 600px)'});

  const onHandlerChangeOrganization = (e) => {
    setOrganization(e.target.value)
  };

  const onHandlerChangeRepository = (e) => {
    setRepository(e.target.value)
  };

  const searchIssues = () => {
    dispatch(issueActions.fetchDataIssues(organization, repository))
  };

  const handleChangePage = (event, value) => {
    dispatch(issueActions.fetchItems(current.organization, current.repository, value))
  };

  return (
    <>
      <Header>
        <IconButton component="span" style={{color: '#ffffff'}}>
          <GitHubIcon/>
        </IconButton>
        Issue Trackers
      </Header>
      <Paper className="issues-container">
        <div className="search-container" noValidate autoComplete="off">
          <Paper component="form" className={classes.search}>
            <InputBase
              label="Organization" value={organization}
              onChange={onHandlerChangeOrganization}
              placeholder="Organization"
              inputProps={{'aria-label': 'organization'}}
            />
            <span className={classes.divider}>/</span>
            <InputBase
              value={repository}
              onChange={onHandlerChangeRepository}
              placeholder="Repository"
              inputProps={{'aria-label': 'repository'}}
            />
            <Button
              onClick={searchIssues}
              startIcon={<SearchIcon>search</SearchIcon>}
            />
          </Paper>
        </div>
        {!error ? <>
          {items && <h5>{`All issues: ${countIssues}`}</h5>}
          <div className={"items"}>
            {!isLoading ? items ? items.map((item ,index) => (
                <IssueItem {...item} index={index} key={item.id}/>
              )) : <p style={{textAlign: "center"}}>...</p>
              :
              <Preloader/>
            }
          </div>
          <div style={{textAlign: 'center'}}>
            {!isLoading && items &&
            <div className={classes.pagination}>
              {isSmall &&
              <Pagination onChange={handleChangePage} count={pages} defaultPage={page} siblingCount={0} size={"small"}
                          shape={"rounded"}/>}
              {isMedium && <Pagination onChange={handleChangePage} count={pages} defaultPage={page} siblingCount={0}
                                       shape={"rounded"}/>}
              {isLarge && <Pagination onChange={handleChangePage} count={pages} defaultPage={page} shape={"rounded"}/>}
            </div>}
          </div>
        </> : <Alert style={{margin: '5px'}} severity="error">{error}</Alert>}
      </Paper>
    </>
  );
};

export default Issues;