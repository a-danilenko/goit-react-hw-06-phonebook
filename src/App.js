import React, { Component } from 'react';
import Filter from './components/Filter/Filter';
import ContactForm from './components/ContactForm/ContactForm';
import ContactsList from './components/ContactsList/ContactsList'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv } from 'uuid';
import { CSSTransition } from 'react-transition-group';
import Fade from './components/Fade.module.css';

export default class App extends Component {
  state = {
    contacts: [ ],
    filter: '',
    name: '',
    number: ''
  };

  componentDidMount() {
    const oldNum = localStorage.getItem('contact');
    if (oldNum) {
      this.setState({
        contacts: JSON.parse(oldNum)
      });
    }
  };
  

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state.contacts.name) {
      localStorage.setItem('contact', JSON.stringify(this.state.contacts));
    }
  };

  addContact = (e) => {
    const searchSameName = this.state.contacts
      .map((contact) => contact.name)
      .includes(e.name);
    const notify = () => toast.error(`${e.name} is already in contacts`);
    const notEmpty = () => toast.error('the field must not be empty!');

    if (searchSameName) {
      notify();
    } else if (e.name.length === 0) {
      notEmpty();
    } else {
      const contact = {
        ...e,
        id: uuidv(),
      };

      this.setState((prevState) => ({
        contacts: [...prevState.contacts, contact],
      }));
    }
  };

  changeFilter = (filter) => {
    this.setState({ filter });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter((contacts) =>
      contacts.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  removeContact = (contactId) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <div>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <CSSTransition
            in
            appear={true}
            timeout={500}
            classNames={Fade}
          >
            <h1>Phonebook</h1>
          </CSSTransition>
          <ContactForm onAddContact={this.addContact} />
          <h2>Contacts</h2>
          <Filter value={filter} onChangeFilter={this.changeFilter} />
          <ContactsList
            contacts={visibleContacts}
            onRemoveContact={this.removeContact}
          /> 
      </div>
    );
  }
}
