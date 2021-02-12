import {Types} from '../actions/issues';

const initState = {
  items: null,
  isLoading: false,
  error: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case Types.SET_ITEMS:
      return {
        ...state,
        items: action.payload,
        isLoading: false,
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
  }
};
