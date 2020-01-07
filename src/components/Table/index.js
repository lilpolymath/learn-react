import React from 'react';
import Button from '../Button';
import PropTypes from 'prop-types';

const largeColumn = {
  width: '40%',
};

const mid = {
  width: '30%',
};

const small = {
  width: '10%',
};

const Table = ({ list, onDismiss }) => (
  <div className='table'>
    {list.map(item => (
      <div key={item.objectID} className='table-row'>
        <span style={largeColumn}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={mid}>{item.author}</span>
        <span style={small}>{item.num_comments}</span>
        <span style={small}>{item.points}</span>
        <span style={small}>
          <Button
            onClick={() => onDismiss(item.objectID)}
            className='button-inline'
          >
            Dismiss
          </Button>
        </span>
      </div>
    ))}
  </div>
);

export default Table;

Table.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      objectID: PropTypes.number.isRequired,
      title: PropTypes.string,
      author: PropTypes.string,
      num_comments: PropTypes.number,
      points: PropTypes.number,
    })
  ).isRequired,
  onDismiss: PropTypes.func.isRequired,
};
