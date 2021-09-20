import Contacts from "../Contacts";
import PropTypes from "prop-types";

function ContactList({ contacts, filter, onDelete }) {
  return (
    <>
      <ol>
        <Contacts onDelete={onDelete} contacts={contacts} filter={filter} />
      </ol>
    </>
  );
}

ContactList.propTypes = {
  filter: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  contacts: PropTypes.array,
};

export default ContactList;
