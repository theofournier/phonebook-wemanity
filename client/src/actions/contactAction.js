import axios from 'axios';
import {
  GET_CONTACTS,
  GET_CONTACT,
  ADD_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
  CONTACT_LOADING,
  CONTACT_ERROR,
  FILTER_CONTACTS
} from './types';
import { search } from '../utils/helper';
import { contactSearchKeys } from '../utils/config';
import { setAlert } from './alertAction';

// Get contacts
export const getContacts = () => async dispatch => {
  dispatch(setLoading(true, 'contacts'));
  try {
    const res = await axios.get('/api/contact', {
      params: {
        sort: 'firstName:1,lastName:1',
      }
    });
    dispatch({
      type: GET_CONTACTS,
      payload: res.data
    });
    dispatch(setError(false, '', '', 'contacts'));
  } catch (err) {
    dispatch(setError(true, err.response.status, err.response.statusText, 'contacts'));
  }
  dispatch(setLoading(false, 'contacts'));
};

// Get contact
export const getContact = (_id) => async dispatch => {
  dispatch(setLoading(true, 'contact'));
  try {
    const res = await axios.get(`/api/contact/${_id}`);
    dispatch({
      type: GET_CONTACT,
      payload: res.data
    });
    dispatch(setError(false, '', '', 'contact'));
  } catch (err) {
    dispatch(setError(true, err.response.status, err.response.statusText, 'contact'));
  }
  dispatch(setLoading(false, 'contact'));
};

export const setContact = (contact) => dispatch => {
  dispatch({
    type: GET_CONTACT,
    payload: contact
  });
}

// Add contacts
export const addContact = (contact, callbackSucces) => async dispatch => {
  dispatch(setLoading(true, 'addContact'));
  try {
    const res = await axios.post('/api/contact', contact);
    dispatch({
      type: ADD_CONTACT,
      payload: res.data
    });
    if (callbackSucces)
      callbackSucces();
    dispatch(setError(false, '', '', 'addContact'));
    dispatch(setAlert('Contact successfully added', 'success'));
  } catch (err) {
    dispatch(setError(true, err.response.status, err.response.statusText, 'addContact'));
    dispatch(setAlert(err.response.statusText, 'error'));
  }
  dispatch(setLoading(false, 'addContact'));
};

// Update contact
export const updateContact = (id, contact, callbackSucces) => async dispatch => {
  dispatch(setLoading(true, 'updateContact'));
  try {
    const res = await axios.put(`/api/contact/${id}`, contact);
    dispatch({
      type: UPDATE_CONTACT,
      payload: res.data
    });
    if (callbackSucces)
      callbackSucces();
    dispatch(setError(false, '', '', 'updateContact'));
    dispatch(setAlert('Contact successfully edited', 'success'));
  } catch (err) {
    dispatch(setError(true, err.response.status, err.response.statusText, 'updateContact'));
    dispatch(setAlert(err.response.statusText, 'error'));
  }
  dispatch(setLoading(false, 'updateContact'));
};

// Delete contact
export const deleteContact = (id, callbackSucces) => async dispatch => {
  dispatch(setLoading(true, 'deleteContact'));
  try {
    const res = await axios.delete(`/api/contact/${id}`);
    dispatch({
      type: DELETE_CONTACT,
      payload: res.data
    });
    if (callbackSucces)
      callbackSucces();
    dispatch(setError(false, '', '', 'deleteContact'));
    dispatch(setAlert('Contact successfully deleted', 'success'));
  } catch (err) {
    dispatch(setError(true, err.response.status, err.response.statusText, 'deleteContact'));
    dispatch(setAlert(err.response.statusText, 'error'));
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

export const filterContacts = (
  contacts,
  searchValue,
) => {
  return {
    type: FILTER_CONTACTS,
    payload: {
      contactsFiltered:
        search(
          contacts,
          searchValue,
          contactSearchKeys,
        ),
      searchValue,
    },
  };
};