import React, { useContext } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import AuthContext from '../contexts/auth';

const PrivateRoute: React.FC<RouteProps> = ({ component: Component, children, ...rest }) => {
  
  const { signed } = useContext(AuthContext);

  return (
    <Route
      render={(props) => signed
        ? Component
          ? <Component {...props} />
          : children
        : <Redirect to={{
          pathname: '/',
          state: { from: props.location }
        }}/>
      }
      {...rest}
    />
  );
}

export default PrivateRoute;