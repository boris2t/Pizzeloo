import React, { Fragment } from 'react'

const Checkout = (props) => {

    const { itemName, size, count } = props.location

    return (
        <Fragment>
            <p>{itemName}</p>
            <p>{size}</p>
            <p>{count}</p>
        </Fragment>
    )
}

export default Checkout