import { v4 as uuidv } from 'uuid';
import types from '../contacts-types';

const addContact = (name, number) => ({
  type: types.ADD,
  payload: {
    id: uuidv(),
    name,
    number,
  },
});

const removeContact = contactId => ({
  type: types.REMOVE,
  payload: contactId,
});

const changeFilter = value => ({
  type: types.CHANGE_FILTER,
  payload: value,
});

const Actions = { addContact, removeContact, changeFilter };

export default Actions;