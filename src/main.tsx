import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import 'modern-normalize/modern-normalize.css';
import './index.css';

// biome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
