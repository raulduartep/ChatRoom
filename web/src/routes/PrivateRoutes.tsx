import React from 'react';

import ChatPage from '../pages/Chat';
import PrivateRoute from '../components/PrivateRoute'

const routes: React.FC = () => {
  return (
    <React.Fragment>
      <PrivateRoute path='/chat' component={ChatPage} />
    </React.Fragment>
  );
}

export default routes;