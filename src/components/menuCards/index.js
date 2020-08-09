import React from 'react'
import styles from './index.module.css'
import Spinner from '../common/spinner'
import DealButton from '../common/buttons/dealButton'
import MenuLink from '../common/menuLink'

const MenuCards = ({ items, loading, type }) => {
    if (loading) {
        return (<Spinner />)
    } else {
        const buttonText = type === 'drinks' ? 'ADD' : 'CHOOSE'
        const drinkImgClass = type === 'drinks' ? 'drink-img' : ''
        const drink = type === 'drinks' ? 'drink' : ''

        const handleAdd = (item) => {
            const basketValue = sessionStorage.getItem('items')
            const basketArray = basketValue == null ? [] : Array.from(JSON.parse(basketValue))
            const basketItem = {
                name: item.name,
                amount: 1,
                price: item.price,
                priceForOne: item.price,
                image: item.image,
                drink: 'drink'
            }
    
            basketArray.push(basketItem)
            sessionStorage.setItem('items', JSON.stringify(basketArray))
        }

        return (
            items.map(item => (
                <div key={item.id} className={styles.column}>
                    <MenuLink to={`/pizzas/${item.name}`} type={type}>
                        <div className={styles.card}>
                            <img src={item.image} className={styles[drinkImgClass]} alt='meal'></img>
                            <h1>{item.name.toUpperCase()}</h1>
                            <hr className={styles.divider} />
                            <p>{item.toppings || item.amount}</p>
                            <DealButton title={buttonText} handleOnClick={() => handleAdd(item)} drink={drink}/>
                        </div>
                    </MenuLink>
                </div>
            ))
        )
    }
}

export default MenuCards