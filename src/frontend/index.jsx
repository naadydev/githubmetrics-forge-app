import React from 'react';
import ForgeReconciler from '@forge/react';
import { App } from './App';
import Config from './components/Config';

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
ForgeReconciler.addConfig(<Config />);


