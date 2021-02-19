import {Types} from '../actions/issues';

const initState = {
  organization: null,
  repository: null,
  countIssues: 0,
  page: null,
  pages: null,
  items: null,
  isLoading: false,
  error: null,
};

const issuesReducer = (state = initState, action) => {
  switch (action.type) {
    case Types.SET_ITEMS:
      return {
        ...state,
        items: action.payload.data,
        isLoading: false,
        page: action.payload.page,
      };
    case Types.SET_DATA_ISSUES:
      return {
        ...state,
        organization: action.payload.organization,
        repository: action.payload.repository,
        page: 1,
        pages: Math.ceil(action.payload.data.total_count / 30),
        countIssues: action.payload.data.total_count,
      };
    case Types.LOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case Types.LOADED:
      return {
        isLoading: false,
      };
    case Types.ERROR:
      return {
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default issuesReducer;