import { combineReducers } from 'redux';
import contactReducer from './contactReducer';
import alertReducer from './alertReducer';

export default combineReducers({
  contact: contactReducer,
  alert: alertReducer
});
