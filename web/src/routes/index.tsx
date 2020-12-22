import React from 'react';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

const routes: React.FC = () => {
  return (
    <React.Fragment>
      <PublicRoutes />
      <PrivateRoutes />
    </React.Fragment>
  );
}

export default routes;