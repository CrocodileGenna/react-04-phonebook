import PropTypes from 'prop-types';
import { ItForm } from './phonebook/Form';
import { ListContacts } from './phonebook/ListContacts';
import { Search } from './phonebook/Search';
import { nanoid } from 'nanoid';

import { GlobalStyle, LIST_DIV } from './App.styled';
import Notiflix from 'notiflix';
import { useState, useEffect } from 'react';

//---------------------------Castom Huck---------------------------------
// const useLocalStorag = (key, defValue) => {
//   const [state, setState] = useState(() => {
//     return JSON.parse(window.localStorage.getItem(key) ?? defValue);
//   });

//   useEffect(() => {
//     window.localStorage.setItem(key, JSON.stringify(state));
//   }, [key, state]);

//   return [state, setState];
// };
//-----------------------------------------------------------------------

export function App() {
  const contact = localStorage.getItem('contacts');
  const contactsParse = JSON.parse(contact);
  const [contacts, setContacts] = useState(
    () =>
      contactsParse ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
  );

  //---------------------------Castom Huck---------------------------------
  // const [contacts, setContacts] = useLocalStorag('contacts', [
  //   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  // ]);
  //-----------------------------------------------------------------------

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const submitHandler = value => {
    value.id = nanoid();
    contacts.some(contact => contact.name === value.name)
      ? Notiflix.Notify.warning(
          "I'm sorry, but a contact with that name is already in the library"
        )
      : setContacts(prevArray => [...prevArray, value]);
  };

  const searchContacts = () => {
    if (filter) {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter)
      );
    }
    return contacts;
  };

  const removeContact = currentId => {
    console.log(currentId);
    setContacts(contacts.filter(({ id }) => id !== currentId));
  };

  return (
    <GlobalStyle>
      <ItForm submit={submitHandler} />
      <LIST_DIV>
        <Search search={e => setFilter(e.target.value)} />
        <ListContacts list={searchContacts()} remove={removeContact} />
      </LIST_DIV>
    </GlobalStyle>
  );
}

ItForm.propTypes = {
  submit: PropTypes.func.isRequired,
};
Search.propTypes = {
  search: PropTypes.func.isRequired,
};
ListContacts.propTypes = {
  list: PropTypes.array.isRequired,
  remove: PropTypes.func.isRequired,
};
