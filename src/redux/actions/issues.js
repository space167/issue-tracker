import {issuesAPI} from "../../api/api";

export const Types = {
  SET_DATA_ISSUES: 'ISSUES@SET:DATA_ISSUES',
  SET_ITEMS: 'ISSUES@SET:ITEMS',
  LOADING: 'ISSUES@LOADING:START',
  LOADED: 'ISSUES@LOADING:FINISH',
  ERROR: 'ISSUES@LOADING:ERROR',
};

const ActionsIssues = {
  setDataIssues: payload => ({
    type: Types.SET_DATA_ISSUES,
    payload,
  }),
  fetchDataIssues: (organization, repository) => async dispatch => {
    dispatch(ActionsIssues.isLoading);
    let countIssues = await issuesAPI.getCountIssues(organization, repository);
    if (countIssues) {
      dispatch(ActionsIssues.setDataIssues({organization, repository, countIssues}))
      if (countIssues.total_count > 0) {
        dispatch(ActionsIssues.fetchItems(organization, repository, 1))
      } else {
        dispatch(ActionsIssues.setItems({issues: [], page: null}))
      }
    } else {
      dispatch(ActionsIssues.isError("Failed to get data..."))
    }
  },
  setItems: payload => ({
    type: Types.SET_ITEMS,
    payload,
  }),
  fetchItems: (organization, repository, page) => async dispatch => {
    dispatch(ActionsIssues.isLoading);
    let issues = await issuesAPI.getIssues(organization, repository, page);
    dispatch(ActionsIssues.setItems({issues, page}))
  },
  isLoading: {
    type: Types.LOADING,
  },
  isLoaded: {
    type: Types.LOADED,
  },
  isError: payload => ({
    type: Types.ERROR,
    payload,
  }),
};

export default ActionsIssues;
