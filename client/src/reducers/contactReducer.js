import {
  GET_CONTACTS,
  ADD_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
  CONTACT_LOADING,
  CONTACT_ERROR,
  FILTER_CONTACTS
} from '../actions/types';
import { isEmpty, search } from '../utils/helper';

const initialState = {
  contacts: [],
  contactsFiltered: [],
  loading: {},
  errors: {},
  contactsSearchValue: ''
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CONTACTS:
      const searchKeys = !isEmpty(payload) ? Object.keys(payload[0]) : [];
      let index = searchKeys.indexOf('_id');
      if (index > -1) {
        searchKeys.splice(index, 1);
      }
      index = searchKeys.indexOf('dateAdd');
      if (index > -1) {
        searchKeys.splice(index, 1);
      }

      return {
        ...state,
        contacts: payload,
        contactsFiltered: search(
          payload,
          state.contactsSearchValue,
          searchKeys,
        ),
      }
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [payload, ...state.contacts],
      }
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact._id === payload._id ? payload : contact
        ),
      }
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact._id !== payload._id),
      }
    case CONTACT_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          [payload.field]: payload.loading
        }
      }
    case CONTACT_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          [payload.field]: {
            hasFailed: payload.hasFailed,
            message: payload.message,
            status: payload.status,
          }
        }
      }
    case FILTER_CONTACTS:
      return {
        ...state,
        contactsFiltered: action.payload.contactsFiltered,
        contactsSearchValue: action.payload.searchValue,
      };
    default:
      return state;
  }
}
