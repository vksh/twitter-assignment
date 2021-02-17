import React, { useEffect, useState } from 'react';
import { socket } from '../client/Socket';
import TwitData from '../model/TwitDataModel';
import { Tile } from './tile/Tile';
import './TwitLists.scss';
import {Error} from '../error/Error';

export const TwitLists = () => {
  const [twitData, setTwitData] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    socket.on('Twit Data received', data => {
      if (data !== null) {
        setTwitData(prevData => [...prevData, new TwitData(data)]);
      }
    });
    socket.on('TwitDataError', () => {
      setHasError(true);
    });
    return () => socket.disconnect();
  }, []);

  const handlePause = () => {
      if (!isPaused) {
        socket.emit('pause stream');
      } else {
          socket.emit('resume stream');
      }
      setIsPaused(!isPaused);
  };

  if (hasError) {
    return <div className="twit-list"><Error /></div>;
  }

  if (twitData.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <div className="twit-list">
        <div className="twit-list-button-container">
            <button className="twit-list-button" onClick={handlePause}>{isPaused ? 'Resume' : 'Pause'}</button>
        </div>
      {twitData.map(twit => (
        <Tile
          key={twit.id}
          imageUrl={twit.profileImageUrl}
          message={twit.message}
          createdAt={twit.createdAt}
          username={twit.userName}
        />
      ))}
    </div>
  );
};
