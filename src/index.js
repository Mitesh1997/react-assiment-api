import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root');
const rootContainer = ReactDOM.createRoot(container);

rootContainer.render(
  <BrowserRouter basename="/">
    <App />
  </BrowserRouter>
);
