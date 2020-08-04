import React, { useState } from 'react'
import styles from './index.module.css'
import ArrowButton from '../../common/buttons/arrowButton';

const ItemDetails = ({ item }) => {
    const [size, setSize] = useState('small')
    const [count, setCount] = useState(1);

    let price = 0
    let weight = ''

    switch (size) {
        case 'small':
            price = Number(item.price) * count
            weight = 350
            break
        case 'medium':
            price = Number(item.price) * 1.5 * count
            weight = 550
            break
        case 'large':
            price = Number(item.price) * 2 * count
            weight = 800
    }

    const lowerCount = () => {
        if (count > 1) {
            setCount(count - 1)
        }
    }

    return (
        <div className={styles['details-container']}>
            <img src={item.image} alt='meal'></img>
            <h1>{item.name}</h1>
            <hr className={styles.divider} />
            <div className={styles.left}>
                <h2>TOPPINGS</h2>
                <p>{item.toppings}</p>
                <label className={styles['size-label']} htmlFor='size'>SIZE</label>
                <select id='size' value={size} onChange={e => setSize(e.target.value)}>
                    <option value='small'>Small (6 slices)</option>
                    <option value='medium'>Medium (8 slices)</option>
                    <option value='large'>Large (12 slices)</option>
                </select>
            </div>
            <div className={styles.right}>
                <h2>WEIGHT</h2>
                <p>{weight}gr</p>
                <div className={styles.price}>
                    <h2>PRICE</h2>
                    <p>${price.toFixed(2)}</p>
                </div>
                <h2>QUANTITY</h2>
                <div className={styles.quantity}>
                    <ArrowButton direction='down' handleOnClick={lowerCount}/>
                    <p>{count}</p>
                    <ArrowButton direction='up' handleOnClick={() => setCount(count + 1)}/>
                </div>
                <button className={styles.proceed}>PROCEED</button>
            </div>
        </div>
    )
}

export default ItemDetails
