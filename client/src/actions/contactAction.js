import axios from 'axios';
import {
  GET_CONTACTS,
  ADD_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
  CONTACT_LOADING,
  CONTACT_ERROR
} from './types';

// Get contacts
export const getContacts = () => async dispatch => {
  dispatch(setLoading(true, 'contacts'));
  try {
    const res = await axios.get('/api/contact');
    dispatch({
      type: GET_CONTACTS,
      payload: res.data
    });
    dispatch(setError(false, '', '', 'contacts'));
  } catch (err) {
    dispatch(setError(true, err.response.status, err.response.message, 'contacts'));
  }
  dispatch(setLoading(false, 'contacts'));
};

// Add contacts
export const addContact = (contact) => async dispatch => {
  dispatch(setLoading(true, 'addContact'));
  try {
    const res = await axios.post('/api/contact', contact);
    dispatch({
      type: ADD_CONTACT,
      payload: res.data
    });
    dispatch(setError(false, '', '', 'addContact'));
  } catch (err) {
    dispatch(setError(true, err.response.status, err.response.message, 'addContact'));
  }
  dispatch(setLoading(false, 'addContact'));
};

// Update contact
export const updateContact = (id, contact) => async dispatch => {
  dispatch(setLoading(true, 'updateContact'));
  try {
    const res = await axios.post(`/api/contact/${id}`, contact);
    dispatch({
      type: UPDATE_CONTACT,
      payload: res.data
    });
    dispatch(setError(false, '', '', 'updateContact'));
  } catch (err) {
    dispatch(setError(true, err.response.status, err.response.message, 'updateContact'));
  }
  dispatch(setLoading(false, 'updateContact'));
};

// Delete contact
export const deleteContact = (id) => async dispatch => {
  dispatch(setLoading(true, 'deleteContact'));
  try {
    const res = await axios.delete(`/api/contact/${id}`);
    dispatch({
      type: DELETE_CONTACT,
      payload: res.data
    });
    dispatch(setError(false, '', '', 'deleteContact'));
  } catch (err) {
    dispatch(setError(true, err.response.status, err.response.message, 'deleteContact'));
  }
  dispatch(setLoading(false, 'deleteContact'));
};


export const setLoading = (loading, field) => {
  return {
    type: CONTACT_LOADING,
    payload: {
      loading,
      field
    },
  };
};
export const setError = (hasFailed, status, message, field) => {
  return {
    type: CONTACT_ERROR,
    payload: {
      hasFailed,
      status,
      message,
      field
    }
  };
}
