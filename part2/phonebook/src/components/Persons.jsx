/* eslint-disable react/prop-types */
import { useState } from "react";
import phonebookService from "../services/phonebook";

const Persons = ({ persons, filter, deletePerson }) => {
  const [notification, setNotification] = useState(null);

  const namesToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = async (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      try {
        await phonebookService.deletePerson(id);
        deletePerson(persons.filter((person) => person.id !== id));
        setNotification({
          message: `${personToDelete.name} deleted successfully.`,
          type: "success",
        });
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      } catch (error) {
        setNotification({
          message: `Information of ${personToDelete.name} has already been removed from the server`,
          type: "error",
        });
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      }
    }
  };

  return (
    <div>
      {notification && <div className="error">{notification.message}</div>}
      {namesToShow.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => handleDelete(person.id)}>delete</button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
