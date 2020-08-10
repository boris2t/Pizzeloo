import React, { useState, useEffect, useRef } from 'react'
import styles from './index.module.css'
import fire from '../../../../fire'
import ArrowButton from '../../../common/buttons/arrowButton'
import Layout from '../../../common/layout'
import { useParams, useHistory } from 'react-router'
import Spinner from '../../../common/spinner'
import CustomizePizza from '../../../customizePizza'

const ItemDetails = () => {
    const [size, setSize] = useState('small')
    const [count, setCount] = useState(1)
    const [item, setItem] = useState({ name: '' })
    const [price, setPrice] = useState(0)
    const [weight, setWeight] = useState('')
    const [priceForOne, setPriceForOne] = useState(0)
    const [addedCost, setAddedCost] = useState(0)
    const [loading, setLoading] = useState(false)
    const [toppings, setToppings] = useState([])
    const [custom, setCustom] = useState()
    const params = useParams()
    const history = useHistory()

    const priceRef = useRef()
    priceRef.current = price
    const addedCostRef = useRef()
    addedCostRef.current = addedCost
    const endRef = useRef(null)

    useEffect(() => {
        const originalPrice = Number(item.price)
        switch (size) {
            case 'small':
                setPrice((originalPrice + addedCost) * count)
                setPriceForOne(price)
                setWeight(350)
                break
            case 'medium':
                setPrice((originalPrice + addedCost) * 1.5 * count)
                setPriceForOne(originalPrice * 1.5)
                setWeight(550)
                break
            case 'large':
                setPrice((originalPrice + addedCost) * 2 * count)
                setPriceForOne(originalPrice * 2)
                setWeight(800)
        }
    }, [size])

    useEffect(() => {
        const originalPrice = Number(item.price)
        setPrice(originalPrice * count)
        setPriceForOne(price)
        setWeight(350)
        setToppings(item.toppings)
    }, [item])

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

    const lowerCount = () => {
        if (count > 1) {
            setCount(count - 1)
        }
    }

    const customizeCallback = (toppings, ingrPrice, isAdded) => {
        const joinedToppings = toppings.join(', ')
        setToppings(joinedToppings)

        isAdded
            ? setPrice(priceRef.current + Number(ingrPrice))
            : setPrice(priceRef.current - Number(ingrPrice))

        isAdded
            ? setAddedCost(addedCostRef.current + Number(ingrPrice))
            : setAddedCost(addedCostRef.current - Number(ingrPrice))
    }

    const handleCustomize = () => {
        setCustom(<CustomizePizza toppings={item.toppings} parentCallback={customizeCallback} />)
    }

    useEffect(() => {
       const deley = setTimeout(() => {
            endRef.current.scrollIntoView({ behavior: "smooth" })
        }, 300)

        return () => clearTimeout(deley)
    }, [custom])

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
                        <p>{toppings}</p>
                        <label className={styles['size-label']} htmlFor='size'>SIZE</label>
                        <select id='size' value={size} onChange={e => setSize(e.target.value)}>
                            <option value='small'>Small (6 slices)</option>
                            <option value='medium'>Medium (8 slices)</option>
                            <option value='large'>Large (12 slices)</option>
                        </select>
                        <button className={styles.customize} onClick={handleCustomize}>Customize</button>
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
                            <ArrowButton direction='down' handleOnClick={lowerCount} />
                            <p>{count}</p>
                            <ArrowButton direction='up' handleOnClick={() => setCount(count + 1)} />
                        </div>
                        <button onClick={handleAddToBasket} className={styles.proceed}>ADD</button>
                    </div>
                </div>
                {custom}
                <div ref={endRef}></div>
            </div>
        </Layout>
    )
}

export default ItemDetails