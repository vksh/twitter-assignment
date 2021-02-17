import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import TwitDashboard from './TwitDashboard/TwitDashboard';

export const App = () => (
      <div>
        <TwitDashboard />
      </div>
  )
;

ReactDOM.render(<App />, document.getElementById('root'));
