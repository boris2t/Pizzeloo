import React from 'react'
import Added from '../components/common/notications/added'

const showAddedNotification = (name, setAdded) => {
    setAdded(<Added name={name}></Added>)
        setTimeout(() => {
            setAdded()
        }, 1000)
}

export default showAddedNotification