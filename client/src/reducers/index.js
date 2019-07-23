import { combineReducers } from 'redux';
import contactReducer from './contactReducer';
import alert from './alert';

export default combineReducers({
  contact: contactReducer,
  alert: alert
});
