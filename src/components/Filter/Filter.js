import PropTypes from "prop-types";
import s from './Filter.module.css';
import { connect } from 'react-redux';
import contactsActions from '../../redux/contacts/contacts-action';

const Filter = ({ value, onChangeFilter }) => (
    <div className={s.filterContainer}>
      Find contacts by name
      <input
        className={s.filterContainerInput}
        type="text"
        value={value}
        onChange={onChangeFilter}
      />
    </div>
  );

Filter.propTypes = {
  value: PropTypes.string,
  onChangeFilter: PropTypes.func,
  contacts: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = (state) => ({
  value: state.contacts.filter,
  contacts: state.contacts.contacts,
})

const mapDispatchToProps = dispatch => ({
  onChangeFilter: e => dispatch(contactsActions.changeFilter(e.target.value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
