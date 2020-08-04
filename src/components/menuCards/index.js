import React, { useState } from 'react'
import styles from './index.module.css'
import Spinner from '../common/spinner'
import DealButton from '../common/buttons/dealButton'
import ItemDetails from '../pages/itemDetails'

const MenuCards = ({ items, loading }) => {
    const [isInDetails, setIsInDetails] = useState(false)
    const [choosenItem, setChoosenItem] = useState({})

    const handleClick = (item) => {
        setChoosenItem(item)
        setIsInDetails(true)
    }

    if (loading) {
        return (<Spinner />)
    } else if (isInDetails)  {
        return (<ItemDetails item={choosenItem}/>)
    } else {
        return (
            items.map(item => (
                <a href='#' key={item.id} onClick={() => handleClick(item)}>
                    <div className={styles.card}>
                        <img src={item.image} alt='meal'></img>
                        <h1>{item.name}</h1>
                        <hr className={styles.divider} />
                        <p>{item.toppings}</p>
                        <DealButton title='CHOOSE' />
                    </div>
                </a>
            ))
        )
    }
}

export default MenuCards