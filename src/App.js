import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/pages/home'
import Login from './components/pages/auth/login'
import SignUp from './components/pages/auth/signup'
import { AuthProvider } from './contexts/Auth'
import PrivateRoute from './components/routes/PrivateRoute'
import AnonymousRoute from './components/routes/AnonymousRoute'
import AdminRoute from './components/routes/AdminRoute'
import Logout from './components/logout'
import Admin from './components/pages/admin'
import Menu from './components/pages/main/menu'
import ItemDetails from './components/pages/main/itemDetails'
import Checkout from './components/pages/order/checkout'
import Basket from './components/pages/order/basket'
import NotFound from './components/pages/main/notFound'
import Drinks from './components/pages/drinks'
import { ToastProvider } from 'react-toast-notifications'

const App = () => {
  return (
    <AuthProvider>
      <ToastProvider autoDismiss={true} autoDismissTimeout={2000} placement='top-right'>
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <AnonymousRoute exact path='/login' component={Login} />
            <AnonymousRoute exact path='/signup' component={SignUp} />
            <Route exact path='/logout' component={Logout} />
            <AdminRoute path='/admin' component={Admin} />
            <Route exact path='/menu' component={Menu} />
            <Route exact path='/menu/drinks' component={Drinks} />
            <Route path='/pizzas/:name' component={ItemDetails} />
            <Route path='/basket' component={Basket} />
            <PrivateRoute path='/checkout' component={Checkout} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </ToastProvider>
    </AuthProvider>
  )
}

export default App
