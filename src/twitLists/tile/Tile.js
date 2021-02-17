import React from 'react';
import PropTypes from 'prop-types';
import './Tile.scss';


export const Tile = ({ imageUrl, username, message, createdAt }) => (
  <div className="tile">
    <div className="image-container">
      <img src={imageUrl} alt={username} />
    </div>
    <div className='message-container'>
        <div className='message-text'>{message}</div>
        <div className='flex-row'>
          <div className='username'>{username}</div>
          <div className='created-at'>{createdAt}</div>
        </div>
    </div>
  </div>
);

Tile.propTypes = {
    imageUrl: PropTypes.string,
    username: PropTypes.string,
    message: PropTypes.string,
    createdAt: PropTypes.string
};

