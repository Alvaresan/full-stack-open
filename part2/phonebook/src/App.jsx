/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import phonebookService from "./services/phonebook";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const showNotification = (message, type) => {
    const notification = {
      message: message,
      type: type,
    };
    setErrorMessage(notification);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const hook = () => {
    phonebookService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  };
  useEffect(hook, []);

  const addName = async (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        try {
          const updatedPerson = { ...existingPerson, number: newNumber };
          await phonebookService.update(existingPerson.id, updatedPerson);
          setPersons(
            persons.map((person) =>
              person.id === existingPerson.id ? updatedPerson : person
            )
          );
          showNotification("Number updated successfully", "success");
          setNewName("");
          setNewNumber("");
        } catch (error) {
          showNotification(
            `Information of ${newName} has been deleted from the server`,
            "error"
          );
          setPersons(persons.filter((person) => person.id !== existingPerson.id));
        }
      }
    } else {
      try {
        const newPerson = {
          name: newName,
          number: newNumber,
          id: uuidv4(),
        };
        const returnedPerson = await phonebookService.create(newPerson);
        setPersons([...persons, returnedPerson]);
        showNotification(`${newName} added successfully`, "success");
        setNewName("");
        setNewNumber("");
      } catch (error) {
        showNotification(
          "An error occurred while adding the person. Please try again later.",
          "error"
        );
      }
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value.toLowerCase());
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <Notification message={errorMessage} />
      <h3>Add a new</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} deletePerson={setPersons} />
    </div>
  );
};

export default App;
