import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';
import GlobalStyles from './assets/styles/global';
import { AuthProvider } from './contexts/auth';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes />
        <GlobalStyles />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
