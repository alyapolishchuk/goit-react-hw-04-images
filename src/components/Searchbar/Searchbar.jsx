import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handlerInput = e => setQuery(e.target.value);

  const handlerSubmit = e => {
    e.preventDefault();

    if (!query.trim()) {
      toast.error('empty field', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={css.header}>
      <form onSubmit={handlerSubmit}>
        <button className={css.button} type="submit">
          Search
        </button>

        <input
          className={css.input}
          type="text"
          name="query"
          value={query}
          autoComplete="off"
          onChange={handlerInput}
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export { Searchbar };
