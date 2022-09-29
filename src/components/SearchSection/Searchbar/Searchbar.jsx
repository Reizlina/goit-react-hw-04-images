import React, { useState } from 'react';
import PropTypes from 'prop-types';

import s from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [value, setValue] = useState('');

  const formSubmit = e => {
    e.preventDefault();
    onSubmit(value);
    setValue('');
  };

  const formChange = e => {
    setValue(e.currentTarget.value);
  };

  return (
    <form onSubmit={formSubmit} className={s.form}>
      <div className={s.webflowstyleinput}>
        <input
          className={s.input}
          placeholder="Let's find it!"
          type="text"
          value={value}
          name="search"
          autoFocus
          autoComplete="off"
          required
          onChange={formChange}
          width="300"
        />
        <button>Search</button>
      </div>
    </form>
  );
}

Searchbar.propTypes = {
  props: PropTypes.objectOf(
    PropTypes.shape({
      onSubmit: PropTypes.func.isRequired,
    })
  ),
};
