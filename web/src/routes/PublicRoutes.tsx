import React from 'react';
import { Route } from 'react-router-dom';
import ChatPage from '../pages/Chat';
import LoginPage from '../pages/Login';

const routes: React.FC = () => {
  return (
    <React.Fragment>
      <Route path='/' exact component={LoginPage}/>
      <Route path='/chat' component={ChatPage} />
    </React.Fragment>
  );
}

export default routes;