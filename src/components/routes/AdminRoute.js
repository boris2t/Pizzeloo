import React, { useContext, useEffect, useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../../contexts/Auth'
import fire from '../../fire'
import Spinner from '../common/spinner'

const AdminRoute = ({ component: RouteComponent, ...rest }) => {
    const { currentUser } = useContext(AuthContext)
    const [isAdmin, setIsAdmin] = useState(null)

    useEffect(() => {
        const checkAdmin = async () => {
            if (currentUser) {
                const db = fire.firestore()
                const response = await db.collection('admins').get()
                const admins = response.docs.map(doc => doc.data().uid)
                const isAdmin = admins.includes(currentUser.uid)

                setIsAdmin(isAdmin)
            } else {
                setIsAdmin(false)
            }
        }

        checkAdmin()
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