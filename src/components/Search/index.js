import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
  render() {
    const { value, onChange, onSubmit, children } = this.props;
    return (
      <form onSubmit={onSubmit}>
        {children} <input type='text' value={value} onChange={onChange} />
        <button type='button'>{children}</button>
      </form>
    );
  }
}

// const Search = ({ value, onChange, onSubmit, children }) => (
//   <form onSubmit={onSubmit}>
//     {children} <input type='text' value={value} onChange={onChange} />
//     <button type='button'>{children}</button>
//   </form>
// );

export default Search;

Search.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
