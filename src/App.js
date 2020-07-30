import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/pages/home';
import Login from './components/pages/login';
import SignUp from './components/pages/signup';
import { AuthProvider } from './contexts/Auth';
//import PrivateRoute from './components/routes/PrivateRoute';
import AnonymousRoute from './components/routes/AnonymousRoute';
import Logout from './components/logout';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <AnonymousRoute exact path='/login' component={Login} />
          <AnonymousRoute exact path='/signup' component={SignUp} />
          <Route exact path='/logout' component={Logout} />
        </Switch>
      </Router>
    </AuthProvider>
  )
}

export default App;
