import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { StorageProvider } from './storage/storageContext'
import 'react-notifications-component/dist/theme.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  <BrowserRouter>
    <StorageProvider><App /> </StorageProvider>
  </BrowserRouter>

);


