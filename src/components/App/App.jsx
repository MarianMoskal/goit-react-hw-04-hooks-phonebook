import { useState, useEffect } from "react";
import Form from "../Form";
import Filter from "../Filter";
import ContactList from "../ContactList";
import { v4 as uuidv4 } from "uuid";
import { Container, Title, SecondaryTitle } from "./index";

function App() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("contacts"));
    localStorage.length !== 0
      ? setContacts([...data])
      : localStorage.setItem("contacts", JSON.stringify([]));
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify([...contacts]));
  }, [contacts]);

  function handleInputValue(e) {
    switch (e.target.name) {
      case "name":
        return setName(e.target.value);

      case "number":
        return setNumber(e.target.value);

      case "filter":
        return setFilter(e.target.value);

      default:
        return;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { inputName, inputNumber } = e.target;
    const foundEl = contacts.find(
      (el) => el.name.toLowerCase() === name.toLowerCase()
    );

    inputName.value = "";
    inputNumber.value = "";
    if (foundEl) {
      alert(`${name} is already in your contacts!`);
    } else {
      const contact = { id: uuidv4(), name, number };
      setContacts(contacts.concat(contact));
    }
  }

  function handleDelete(e) {
    setContacts(contacts.filter((el) => el.id !== e.target.id));
  }

  return (
    <>
      <Container>
        <Title>Phonebook</Title>
        <Form onChange={handleInputValue} onSubmit={handleSubmit} />
      </Container>

      {contacts.length > 0 && (
        <Container>
          <SecondaryTitle>Contacts</SecondaryTitle>
          <Filter onChange={handleInputValue} />
          <ContactList
            onDelete={handleDelete}
            contacts={contacts}
            filter={filter}
          />
        </Container>
      )}
    </>
  );
}

export default App;
