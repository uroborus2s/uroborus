import React from 'react';

import { CssGlobalProvider } from '@uroborus/sense-ui';
import ReactDOM from 'react-dom/client';

import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CssGlobalProvider>
      <App />
    </CssGlobalProvider>
  </React.StrictMode>,
);
