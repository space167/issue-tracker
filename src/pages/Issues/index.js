import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom'
import {useMediaQuery} from 'react-responsive'
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
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

const Issues = ({match}) => {
  const params = match.params;
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const {isLoading, error, items, pages, countIssues, ...current} = useSelector(({issues}) => (issues));
  const [organization, setOrganization] = useState(params.organization ?? "");
  const [repository, setRepository] = useState(params.repository ?? params.repository);

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
    history.push(`/${organization}/${repository}/issues/page/1`);
  };

  const handleChangePage = (event, value) => {
    history.push(`/${current.organization}/${current.repository}/issues/page/${value}`);
  };

  useEffect(() => {
    if (params.organization || params.repository || params.page) {
      if (params.organization !== current.organization || params.repository !== current.repository || params.page !== current.page) {
        dispatch(issueActions.fetchDataIssues(params.organization, params.repository, params.page))
      }
    }
  }, [dispatch, params]);

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
          <Paper component="form" onSubmit={searchIssues} className={classes.search}>
            <InputBase
              required={true}
              label="Organization" value={organization}
              onChange={onHandlerChangeOrganization}
              placeholder="Organization"
              inputProps={{'aria-label': 'organization'}}
            />
            <span className={classes.divider}>/</span>
            <InputBase
              required={true}
              value={repository}
              onChange={onHandlerChangeRepository}
              placeholder="Repository"
              inputProps={{'aria-label': 'repository'}}
            />
            <Button
              type="submit"
              startIcon={<SearchIcon>search</SearchIcon>}
            />
          </Paper>
        </div>
        {!error ? <>
          {items && <h5>{`All issues: ${countIssues}`}</h5>}
          <div className={"items"}>
            {!isLoading ? items ? items.map((item, index) => (
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
              <Pagination onChange={handleChangePage} count={pages} defaultPage={Number(current.page)} siblingCount={0}
                          size={"small"}
                          shape={"rounded"}/>}
              {isMedium &&
              <Pagination onChange={handleChangePage} count={pages} defaultPage={Number(current.page)} siblingCount={0}
                          shape={"rounded"}/>}
              {isLarge &&
              <Pagination onChange={handleChangePage} count={pages} defaultPage={Number(current.page)}
                          shape={"rounded"}/>}
            </div>}
          </div>
        </> : <Alert style={{margin: '5px'}} severity="error">{error}</Alert>}
      </Paper>
    </>
  );
};

Issues.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      organization: PropTypes.string,
      repository: PropTypes.string,
      page: PropTypes.string,
    })
  }),
};

export default Issues;