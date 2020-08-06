import React from 'react'
import styles from './index.module.css'
import Spinner from '../common/spinner'
import DealButton from '../common/buttons/dealButton'
import { Link } from 'react-router-dom'

const MenuCards = ({ items, loading }) => {
    if (loading) {
        return (<Spinner />)
    } else {
        return (
            items.map(item => (
                <div key={item.id} className={styles.column}>
                    <Link to={`/pizzas/${item.name}`}>
                        <div className={styles.card}>

                            <img src={item.image} alt='meal'></img>
                            <h1>{item.name.toUpperCase()}</h1>
                            <hr className={styles.divider} />
                            <p>{item.toppings}</p>
                            <DealButton title='CHOOSE' />
                        </div>
                    </Link>
                </div>
            ))
        )
    }
}

export default MenuCards