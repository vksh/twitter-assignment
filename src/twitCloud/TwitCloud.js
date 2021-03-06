import React, { useEffect, useState } from 'react';
import { socket } from '../client/Socket';
import Tags from './tags/Tags';
import {Error} from '../error/Error';
import './TwitCloud.scss';

const TwitCloud = () => {
  const [trendsData, setTrendsData] = useState();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    socket.on('Trends Updated', data => {
      setTrendsData(data[0].trends);
    });
    socket.on('Error Fetching Trends', () => {
      setHasError(true);
    });
    return () => socket.disconnect();
  }, []);

  if (hasError) {
    return <div className="twit-cloud error"><Error /></div>;
  }
  if (!trendsData) {
      return <div>Loading..</div>;
    }
  return (
    <ul className="twit-cloud">
      {trendsData.map(trend => <Tags key={trend.name} count={trend.tweet_volume || 100} title={trend.name}/>)}
    </ul>
  );
};

export default TwitCloud;
