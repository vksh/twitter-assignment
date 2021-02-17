import React, { useEffect, useState } from 'react';
import { socket } from '../client/Socket';
import TwitData from '../model/TwitDataModel';
import { Tile } from '../tile/Tile';

export const TwitLists = () => {
  const [twitData, setTwitData] = useState([]);
  const [hasError, setHasError] = useState(false);

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

  if (hasError) {
    return <div>Error</div>;
  }

  if (!twitData) {
    return <div>Loading...</div>;
  }
  return (
    <div className="twit-list">
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
