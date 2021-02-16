import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import socketIOClient from 'socket.io-client';
const ENDPOINT = 'http://localhost:4001';

export const App = () => {
    const [response, setResponse] = useState('');

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('FromAPI', data => {
      setResponse(data);
    });
    return () => socket.disconnect();
  }, []);

  return (
      <div>{response}</div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
