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
  fetchItem: (organization, repository, id) => {
    return dispatch => {
      dispatch(ActionsIssue.isLoading);
      issueAPI.getIssue(dispatch, organization, repository, id);
    };
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
