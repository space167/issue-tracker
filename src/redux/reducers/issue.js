import {Types} from '../actions/issue';

const initState = {
  item: null,
  isLoading: false,
  error: null,
};

const issueReducer = (state = initState, action) => {
  switch (action.type) {
    case Types.SET_ITEM:
      return {
        ...state,
        item: action.payload,
        isLoading: false,
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

export default issueReducer;