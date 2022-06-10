import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import './styles/styles.scss';
import { HashRouter } from 'react-router-dom';

const domContainer = document.getElementById('root');
ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  domContainer
);
