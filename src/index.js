import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BroowserRouter} from 'react-router-dom'

ReactDOM.render(
  <BroowserRouter>
    <App />
  </BroowserRouter>,
  document.getElementById('root')
);

