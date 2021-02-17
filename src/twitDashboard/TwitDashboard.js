import React from 'react';
import TwitCloud from '../twitCloud/TwitCloud';
import { TwitLists } from '../twitLists/TwitLists';
import './TwitDashboard.scss';

const TwitDashboard = () => (
    <div className='dashboard'>
        <TwitLists />
        <TwitCloud/>
    </div>
  );

// TwitDashboard.propTypes = {};

export default TwitDashboard;
