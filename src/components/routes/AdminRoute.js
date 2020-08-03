import React, { useContext, useEffect, useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../../contexts/Auth'
import Spinner from '../common/spinner'

const AdminRoute = ({ component: RouteComponent, ...rest }) => {
    const { currentUser } = useContext(AuthContext)
    const [isAdmin, setIsAdmin] = useState(null)

    useEffect(() => {
        if (currentUser && currentUser.isAdmin) {
            setIsAdmin(true)
        } else {
            setIsAdmin(false)
        }
    })

    return isAdmin === null ? (
        <Spinner />
    ) : (
            <Route
                {...rest}
                render={routeProps =>
                    isAdmin ? (
                        <RouteComponent {...routeProps} />
                    ) : (
                            <Redirect to={'/'} />
                        )
                }
            />
        )
}

export default AdminRoute