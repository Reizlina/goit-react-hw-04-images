import React, { Component } from 'react';
import PropTypes from 'prop-types';

import s from './Searchbar.module.css';

class Searchbar extends Component {
  state = { value: '' };

  formSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.value);
    this.setState({ value: '' });
  };

  formChange = e => {
    this.setState({ value: e.currentTarget.value });
  };

  render() {
    const { value } = this.state;
    const { formSubmit, formChange } = this;
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
}

export default Searchbar;

Searchbar.propTypes = {
  props: PropTypes.objectOf(
    PropTypes.shape({
      onSubmit: PropTypes.func.isRequired,
    })
  ),
};
