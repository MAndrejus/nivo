import React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import './styles/styles.scss';
import App from './App';

const domContainer = document.getElementById('root');
render(
  <HashRouter>
    <App />
  </HashRouter>,
  domContainer
);
