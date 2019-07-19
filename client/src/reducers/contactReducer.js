import {
  GET_CONTACTS,
  CONTACTS_ERROR
} from '../actions/types';

const initialState = {
  contacts: [],
  loading: true,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CONTACTS:
      return {
        ...state,
        loading: false,
        contacts: payload
      }
    default:
      return state;
  }
}
