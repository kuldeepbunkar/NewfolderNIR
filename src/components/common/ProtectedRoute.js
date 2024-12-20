import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loading from './Loading';

function ProtectedRoute({ component: Component, ...rest }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default ProtectedRoute; 