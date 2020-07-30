import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../contexts/Auth';

const AnonymousRoute = ({ component: RouteComponent, ...rest }) => {
  const {currentUser} = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={routeProps =>
        !!currentUser ? (
            <Redirect to={'/'} />
        ) : (
          <RouteComponent {...routeProps} />
        )
      }
    />
  );
};


export default AnonymousRoute