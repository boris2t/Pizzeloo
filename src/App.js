import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/pages/home';
import Login from './components/pages/login';
import SignUp from './components/pages/signup';
import { AuthProvider } from './contexts/Auth';
//import PrivateRoute from './components/routes/PrivateRoute';
import Logout from './components/logout';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/logout' component={Logout} />
        </Switch>
      </Router>
    </AuthProvider>
  )
}

export default App;
