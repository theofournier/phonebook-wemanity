import {
  GET_CONTACTS,
  ADD_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
  CONTACT_LOADING,
  CONTACT_ERROR
} from '../actions/types';

const initialState = {
  contacts: [],
  loading: {},
  errors: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: payload,
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
    default:
      return state;
  }
}
