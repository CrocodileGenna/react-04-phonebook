import { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

import { FORM_DIV, INPUT, BUTTUN } from './styled/Form.styled';

export function ItForm({ submit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChang = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const submitForm = e => {
    e.preventDefault();
    submit({ name, number });
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <Formik>
      <FORM_DIV onSubmit={submitForm} autoComplete="off">
        Phonebook
        <INPUT
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          placeholder="name"
          value={name}
          onChange={handleChang}
          required
        />
        <INPUT
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          placeholder="number"
          value={number}
          onChange={handleChang}
          required
        />
        <BUTTUN type="submit">Add contact</BUTTUN>
      </FORM_DIV>
    </Formik>
  );
}

FORM_DIV.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

INPUT.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
