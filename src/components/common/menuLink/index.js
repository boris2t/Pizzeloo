import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'


const MenuLink = ({ to, type, children }) => {
    return type === 'drinks' 
    ? (<Fragment>{children}</Fragment>) 
    : (
        <Link to={to}>
            {children}
        </Link>
    )
}

export default MenuLink