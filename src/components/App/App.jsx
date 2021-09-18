import { Component } from "react";
import Form from "../Form";
import Filter from "../Filter";
import ContactList from "../ContactList";
import { v4 as uuidv4 } from "uuid";
import { Container, Title, SecondaryTitle } from "./index";

class App extends Component {
  state = {
    contacts: [
      //     {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      // {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      // {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      // {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: "",
  };

  componentDidMount() {
    if (localStorage.length === 0) {
      this.setInitialValue();
    } else {
      this.getDataFromLocalStorage();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      this.setLocalStorageData();
    }
  }

  setInitialValue() {
    return localStorage.setItem("contacts", JSON.stringify([]));
  }

  setLocalStorageData() {
    return localStorage.setItem(
      "contacts",
      JSON.stringify([...this.state.contacts])
    );
  }

  getDataFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem("contacts"));
    this.setState((state) => ({ contacts: state.contacts.concat([...data]) }));
  }

  handleInputValue = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  handleDelete = (e) => {
    this.setState({
      contacts: this.state.contacts.filter((el) => el.id !== e.target.id),
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { contacts, name, number } = this.state;
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
      this.setState((prevState) => ({
        contacts: prevState.contacts.concat(contact),
      }));
    }
  };

  render() {
    const { contacts, filter } = this.state;

    return (
      <>
        <Container>
          <Title>Phonebook</Title>
          <Form onChange={this.handleInputValue} onSubmit={this.handleSubmit} />
        </Container>

        {contacts.length > 0 && (
          <Container>
            <SecondaryTitle>Contacts</SecondaryTitle>
            <Filter onChange={this.handleInputValue} />
            <ContactList
              onDelete={this.handleDelete}
              contacts={contacts}
              filter={filter}
            />
          </Container>
        )}
      </>
    );
  }
}

export default App;
