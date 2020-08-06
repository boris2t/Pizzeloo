import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/pages/home'
import Login from './components/pages/login'
import SignUp from './components/pages/signup'
import { AuthProvider } from './contexts/Auth'
import PrivateRoute from './components/routes/PrivateRoute'
import AnonymousRoute from './components/routes/AnonymousRoute'
import AdminRoute from './components/routes/AdminRoute'
import Logout from './components/logout'
import Admin from './components/pages/admin'
import Menu from './components/pages/menu'
import ItemDetails from './components/pages/itemDetails'
import Checkout from './components/pages/checkout'
import Basket from './components/pages/basket'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <AnonymousRoute exact path='/login' component={Login} />
          <AnonymousRoute exact path='/signup' component={SignUp} />
          <Route exact path='/logout' component={Logout} />
          <AdminRoute path='/admin' component={Admin} />
          <Route exact path='/menu' component={Menu} />
          <Route path='/pizzas/:name' component={ItemDetails}/>
          <Route path='/basket' component={Basket} />
          <PrivateRoute path='/checkout' component={Checkout}/>
        </Switch>
      </Router>
    </AuthProvider>
  )
}

export default App
