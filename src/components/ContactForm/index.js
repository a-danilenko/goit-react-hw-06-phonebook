import { Component } from "react";
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import contactsActions from '../../redux/contacts/contacts-action';
import { connect } from 'react-redux';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  static propTypes = {
    contacts: PropTypes.array,
    onSubmit: PropTypes.func,
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    const { name, number } = this.state;
    const notify = () => toast.error(`${name} is already in contacts`);
    const notEmpty = () => toast.error('the field "name & number" must not be empty!');

    e.preventDefault();

    if (name === '' || number === '') {
      notEmpty();
      return;
    }

    if (this.props.contacts.find((item) => item.name.toLowerCase() === name.toLowerCase())) {
      notify();
      return;
    }
    
    this.props.onSubmit(name, number);

    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
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
        <form className={s.contactForm} onSubmit={this.handleSubmit}>
          <label className={s.contactFormLabel}>
            Name
            <input
              className={s.contactFormInput}
              type='text'
              name='name'
              value={name}
              onChange={this.handleChange}
              placeholder="Name"
            />
          </label>
          <label className={s.contactFormLabel}>
            Number
            <input
              className={s.contactFormInput}
              type='text'
              name='number'
              value={number}
              onChange={this.handleChange}
              placeholder='xxx-xxx-xxx'
              pattern="^[0-9- ]*$"
            />
          </label>
          <button className={s.addButton} onClick={this.handleSubmit}>
            Add contact
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  contacts: state.contacts.contacts,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (name, number) => dispatch(contactsActions.addContact(name, number)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
