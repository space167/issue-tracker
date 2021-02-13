import {issuesAPI} from "../../api/api";

export const Types = {
  SET_DATA_ISSUES: 'ISSUES@SET:DATA_ISSUES',
  SET_ITEMS: 'ISSUES@SET:ITEMS',
  LOADING: 'ISSUES@LOADING:START',
  LOADED: 'ISSUES@LOADING:FINISH',
  ERROR: 'ISSUES@LOADING:ERROR',
};

const Actions = {
  setDataIssues: payload => ({
    type: Types.SET_DATA_ISSUES,
    payload,
  }),
  fetchDataIssues: (organization, repository) => async dispatch => {
    dispatch(Actions.isLoading);
    let countIssues = await issuesAPI.getCountIssues(organization, repository);
    dispatch(Actions.setDataIssues({organization, repository, countIssues}))
    if (countIssues.total_count > 0) {
      dispatch(Actions.fetchItems(organization, repository, 1))
    } else {
      dispatch(Actions.setItems({issues: [], page: null}))
    }
  },
  setItems: payload => ({
    type: Types.SET_ITEMS,
    payload,
  }),
  fetchItems: (organization, repository, page) => async dispatch => {
    dispatch(Actions.isLoading);
    let issues = await issuesAPI.getIssues(organization, repository, page);
    dispatch(Actions.setItems({issues, page}))
  },
  isLoading: {
    type: Types.LOADING,
  },
  isLoaded: {
    type: Types.LOADED,
  },
  isError: err => ({
    type: Types.ERROR,
    payload: err,
  }),
};

export default Actions;
