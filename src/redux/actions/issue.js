import {issueAPI} from "../../api/api";

export const Types = {
  SET_ITEM: 'ISSUE@SET:ITEM',
  LOADING: 'ISSUE@LOADING:START',
  LOADED: 'ISSUE@LOADING:FINISH',
  ERROR: 'ISSUE@LOADING:ERROR',
};

const ActionsIssue = {
  setItem: payload => ({
    type: Types.SET_ITEM,
    payload,
  }),
  fetchItem: (organization, repository, id) => async dispatch => {
    dispatch(ActionsIssue.isLoading);
    let issue = await issueAPI.getIssue(organization, repository, id);
    if (issue) {
      dispatch(ActionsIssue.setItem(issue))
    } else {
      dispatch(ActionsIssue.isError("Failed to get data..."))
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

export default ActionsIssue;
