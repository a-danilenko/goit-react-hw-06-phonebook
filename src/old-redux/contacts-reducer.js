import { combineReducers } from "redux";
import types from './contacts-types';

const contacts = (state = [], { type, payload }) => {
  switch (type) {
    case types.ADD:
      return [...state, payload];
    
    case types.REMOVE:
      return state.filter(({ id }) => id !== payload);
    
    default:
      return state;
  }
};

const filter = (state = '', { type, payload }) => {
  switch (type) {
    case types.CHANGE_FILTER:
      return payload;
    
    default:
      return state;
  }
};

export default combineReducers({
  contacts,
  filter,
});
