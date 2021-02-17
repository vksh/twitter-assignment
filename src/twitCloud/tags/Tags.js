import React from 'react';
import PropTypes from 'prop-types';
import './Tags.scss';

const Tags = ({ count, title }) => (
  <li className='tags'>
    <a style={{ '--weight': count }} data-weight={count}>
      {title}
    </a>
    <span className="tooltiptext">{count}</span>
  </li>
);

Tags.propTypes = {
  count: PropTypes.number,
  title: PropTypes.string
};

export default Tags;
