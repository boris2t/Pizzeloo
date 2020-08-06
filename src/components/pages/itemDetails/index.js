import React, { useState, useEffect } from 'react'
import styles from './index.module.css'
import fire from '../../../fire'
import ArrowButton from '../../common/buttons/arrowButton'
import Layout from '../../common/layout'
import { useParams } from 'react-router'
import Spinner from '../../common/spinner'
import { Link } from 'react-router-dom'
import Checkout from '../checkout'

const ItemDetails = () => {
    const [size, setSize] = useState('small')
    const [count, setCount] = useState(1)
    const [item, setItem] = useState({ name: '' })
    const [loading, setLoading] = useState(false);
    const params = useParams()

    useEffect(() => {
        const getItem = async () => {
            setLoading(true)
            const db = fire.firestore()
            const data = await db.collection('pizzas')
                .where('name', '==', params.name)
                .get()
            setItem(data.docs[0].data())
            setLoading(false)
        }
        getItem()
    }, [])

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

    const checkoutTo = {
        pathname: '/checkout',
        itemName: item.name,
        size: size,
        count: count
    }

    return loading ? (<Spinner />) : (
        <Layout sticky={true}>
            <div className={styles.container}>
                <div className={styles['details-container']}>
                    <img src={item.image} alt='meal'></img>
                    <h1>{item.name.toUpperCase()}</h1>
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
                    <div className={styles.verticalDivider}></div>
                    <div className={styles.right}>
                        <h2>WEIGHT</h2>
                        <p>{weight}gr</p>
                        <div className={styles.price}>
                            <h2>PRICE</h2>
                            <p>${price.toFixed(2)}</p>
                        </div>
                        <h2>QUANTITY</h2>
                        <div className={styles.quantity}>
                            <ArrowButton direction='down' handleOnClick={lowerCount} />
                            <p>{count}</p>
                            <ArrowButton direction='up' handleOnClick={() => setCount(count + 1)} />
                        </div>
                        <Link to={checkoutTo}>
                            <button className={styles.proceed}>PROCEED</button>
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ItemDetails
