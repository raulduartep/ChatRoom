import React from 'react';
import { Route } from 'react-router-dom';

import LoginPage from '../pages/Login';

const routes: React.FC = () => {
  return (
    <React.Fragment>
      <Route path='/' exact component={LoginPage}/>
    </React.Fragment>
  );
}

export default routes;