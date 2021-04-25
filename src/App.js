import Filter from './components/Filter/Filter';
import ContactForm from './components/ContactForm';
import ContactsList from './components/ContactsList';
import { CSSTransition } from 'react-transition-group';
import Fade from './components/Fade.module.css';
import { connect } from 'react-redux';
import contactsActions from './redux/contacts/contacts-action';

const App = (props) => {
  return (
    <>
      <CSSTransition
        in
        appear={true}
        timeout={500}
        classNames={Fade}
      >
        <h1>Phonebook</h1>
      </CSSTransition>
      <ContactForm onAddContact={props.addContact} />
      <h2>Contacts</h2>
      <Filter  />
      {props.contacts && props.contacts.length > 0 && <ContactsList />} 
    </>
  );
  }

const mapStateToProps = (state) => ({
  contacts: state.contacts.contacts,
})

const mapDispatchToProps = () => ({
  addContact: contactsActions.addContact,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);