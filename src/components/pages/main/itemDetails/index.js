import React, { useState, useEffect } from 'react'
import styles from './index.module.css'
import fire from '../../../../fire'
import ArrowButton from '../../../common/buttons/arrowButton'
import Layout from '../../../common/layout'
import { useParams, useHistory } from 'react-router'
import Spinner from '../../../common/spinner'

const ItemDetails = () => {
    const [size, setSize] = useState('small')
    const [count, setCount] = useState(1)
    const [item, setItem] = useState({ name: '' })
    const [loading, setLoading] = useState(false)
    const params = useParams()
    const history = useHistory()

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

    const originalPrice = Number(item.price)
    let price = 0
    let priceForOne = 0
    let weight = ''

    switch (size) {
        case 'small':
            price = originalPrice * count
            priceForOne = price
            weight = 350
            break
        case 'medium':
            price = originalPrice * 1.5 * count
            priceForOne = originalPrice * 1.5
            weight = 550
            break
        case 'large':
            price = originalPrice * 2 * count
            priceForOne = originalPrice * 2
            weight = 800
    }

    const lowerCount = () => {
        if (count > 1) {
            setCount(count - 1)
        }
    }

    const handleAddToBasket = () => {
        const basketValue = sessionStorage.getItem('items')
        const basketArray = basketValue == null ? [] : Array.from(JSON.parse(basketValue))
        const basketItem = {
            name: item.name,
            amount: count,
            size: size,
            price: price,
            priceForOne: priceForOne,
            image: item.image
        }

        basketArray.push(basketItem)
        sessionStorage.setItem('items', JSON.stringify(basketArray))
        history.push('/menu')
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
                        <button onClick={handleAddToBasket} className={styles.proceed}>ADD</button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ItemDetails
