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
  fetchDataIssues: (organization, repository, page) => {
    return dispatch => {
      dispatch(ActionsIssues.isLoading);
      issuesAPI.getCountIssues(dispatch, organization, repository, page);
    }
  },
  setItems: payload => ({
    type: Types.SET_ITEMS,
    payload,
  }),
  fetchItems: (organization, repository, page) => {
    return dispatch => {
      dispatch(ActionsIssues.isLoading);
      issuesAPI.getIssues(dispatch, organization, repository, page);
    }
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
