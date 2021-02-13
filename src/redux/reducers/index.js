import { combineReducers } from 'redux';

import issues from './issues';
import issue from './issue';

export default combineReducers({
  issues,
  issue,
});
