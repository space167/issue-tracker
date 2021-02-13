import {Types} from '../actions/issues';

const initState = {
  organization: null,
  repository: null,
  countIssues: 0,
  page: null,
  items: null,
  isLoading: false,
  error: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case Types.SET_ITEMS:
      return {
        ...state,
        items: action.payload.issues,
        isLoading: false,
        page: action.payload.page
      };
    case Types.SET_DATA_ISSUES:
      return {
        ...state,
        organization: action.payload.organization,
        repository: action.payload.repository,
        page: 1,
        countIssues: action.payload.countIssues.total_count
      };
    case Types.LOADING:
      return {
        ...state,
        isLoading: true,
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
