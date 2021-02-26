import PropTypes from "prop-types";
import s from './ContactList.module.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Fade from '../Fade.module.css';


const ContactList = ({ contacts, onRemoveContact }) => (
  <TransitionGroup component='ul'>
    {contacts.map((contact) =>
      <CSSTransition
        key={contact.id}
        timeout={500}
        classNames={Fade}
      >
        <li className={s.contactItem} key={contact.id}>
          {`${contact.name} : ${contact.number}`}
          {
            <button
              className={s.contactButton}
              type='button'
              name='delete'
              onClick={() => onRemoveContact(contact.id)}
            >
              delete contact
            </button>
          }
        </li>
      </CSSTransition>
    )}
  </TransitionGroup>
);

ContactList.propTypes = {
  onRemoveContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
  })),
}

export default ContactList;
