import axios from 'axios';
import {
  GET_CONTACTS,
  CONTACTS_ERROR
} from './types';

// Get contacts
export const getContacts = () => async dispatch => {
  try {
    const res = await axios.get('/api/contact');
    dispatch({
      type: GET_CONTACTS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};
