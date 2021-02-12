import React, {useState} from 'react';
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import SearchIcon from '@material-ui/icons/Search';
import Pagination from "@material-ui/lab/Pagination";
import {makeStyles} from "@material-ui/core";
import {useMediaQuery} from 'react-responsive'
import {Header, IssueItem} from "../../components";

import "./Issues.sass"

let data = [
  {
    id: "213213321",
    title: "Bug: Native multiple only change value on second click on Firefox",
    date_created: "#93 by ngavalas was merged on 3 Jul 2013",
    created_at: "2021-02-12T07:22:04Z",
    closed_at: null,
    state: "open",
  },
  {
    id: "213213322",
    title: "Bug: Native multiple only change value on second click on Firefox",
    date_created: "#93 by ngavalas was merged on 3 Jul 2013",
    created_at: "2021-02-12T07:22:04Z",
    closed_at: "2021-02-12T07:22:04Z",
    state: "closed",
  },
  {
    id: "213213323",
    title: "Bug: Native multiple only change value on second click on Firefox",
    date_created: "#93 by ngavalas was merged on 3 Jul 2013",
    created_at: "2021-02-12T07:22:04Z",
    closed_at: null,
    state: "open",
  },
];

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
}));


const Index = () => {
  const classes = useStyles();
  const [organization, setOrganization] = useState('');
  const [repository, setRepository] = useState('');

  const isSmall = useMediaQuery({query: '(max-width: 399px)'})
  const isMedium = useMediaQuery({query: '(min-width: 400px) and (max-width: 599px)'})
  const isLarge = useMediaQuery({query: '(min-width: 600px)'})

  const onHandlerChangeOrganization = (e) => {
    setOrganization(e.target.value)
  };

  const onHandlerChangeRepository = (e) => {
    setRepository(e.target.value)
  };

  return (
    <>
      <Header>Issue Tracker</Header>
      <Paper className="issues-container">
        <form className="search-container" noValidate autoComplete="off">
          <TextField id="organization" label="Organization" value={organization}
                     onChange={onHandlerChangeOrganization}/>
          <TextField id="repository" label="Repository"
                     value={repository}
                     onChange={onHandlerChangeRepository}/>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SearchIcon>search</SearchIcon>}
          >
            Search
          </Button>
        </form>
        <div className={"items"}>
          {data.map((item) => (
            <IssueItem {...item} key={item.id}/>
          ))}
        </div>
        <div style={{textAlign: 'center'}}>
          <div className={classes.pagination}>
            {isSmall && <Pagination count={3} shape={"rounded"}/>}
            {isMedium && <Pagination count={5} shape={"rounded"}/>}
            {isLarge && <Pagination count={10} shape={"rounded"}/>}
          </div>
        </div>
      </Paper>
    </>
  );
};

export default Index;