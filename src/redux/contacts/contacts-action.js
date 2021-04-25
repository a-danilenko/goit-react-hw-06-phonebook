import { createAction } from '@reduxjs/toolkit';
import { v4 as uuidv } from 'uuid';

const addContact = createAction('contacts/add', (name, number) => ({
  payload: {
    id: uuidv(),
    name,
    number,
  },
}));

const removeContact = createAction('contacts/remove');

const changeFilter = createAction('contacts/changeFilter');

const contactsActions = {
  addContact,
  removeContact,
  changeFilter,
};

export default contactsActions;