import axios from 'axios';

export const Types = {
  SET_ITEMS: 'ISSUES@SET:ITEMS',
  LOADING: 'ISSUES@LOADING:START',
  LOADED: 'ISSUES@LOADING:FINISH',
  ERROR: 'ISSUES@LOADING:ERROR',
};

const Actions = {
  setItems: payload => ({
    type: Types.SET_ITEMS,
    payload,
  }),
  fetchItems: ({ page, per_page }) => dispatch => {
    dispatch(Actions.isLoading);
  // todo: Get issues per page
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
