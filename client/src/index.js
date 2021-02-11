import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AlertState from './context/alert/AlertState';

ReactDOM.render(
    <AlertState>
      <App />
    </AlertState>,
  document.getElementById('root')
);
