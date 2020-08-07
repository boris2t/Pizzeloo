import React, { Fragment, useState, useEffect } from 'react'
import Layout from '../../common/layout'
import styles from './index.module.css'
import { Link } from 'react-router-dom'
import spliceNoMutate from '../../../functions/spliceNoMutate'

const Basket = () => {
    const items = sessionStorage.getItem('items')
    const itemsArray = JSON.parse(items)
    const amounts = itemsArray ? itemsArray.map(item => (item.amount)) : []
    const prices = itemsArray ? itemsArray.map(item => (item.price)) : []
    const pricesForOne = itemsArray ? itemsArray.map(item => (item.priceForOne)) : []
    const [itemsState, setItemsState] = useState(itemsArray);
    const [price, setPrice] = useState(prices)
    const [amount, setAmount] = useState(amounts)
    const [oldAmount, setOldAmount] = useState()
    const [newAmount, setNewAmount] = useState()
    const [index, setIndex] = useState()

    const handleChange = (event, indexParam) => {
        setIndex(indexParam)
        setNewAmount(Number(event.target.value))
    }

    useEffect(() => {
        setOldAmount(amount[index])
    }, [index])

    useEffect(() => {
        const newAmountArray = [...amount]
        newAmountArray[index] = newAmount
        setAmount(newAmountArray)
        setOldAmount(amount[index])
    }, [newAmount])

    useEffect(() => {
        const newPriceArray = [...price]

        if (newAmount > Number(oldAmount)) {
            const newPrice = Number(price[index]) + Number(pricesForOne[index])
            newPriceArray[index] = newPrice
        } else if (newAmount < Number(oldAmount)) {
            const newPrice = Number(price[index]) - Number(pricesForOne[index])
            newPriceArray[index] = newPrice
        }

        setPrice(newPriceArray)
    }, [oldAmount])

    
    const handleRemove = (index) => {
        const newItems = spliceNoMutate(itemsState, index)
        const newPrices = spliceNoMutate(price, index)
        
        setPrice(newPrices)
        setItemsState(newItems)

        if (newItems.length === 0) {
            sessionStorage.removeItem('items')
        } else {
            sessionStorage.setItem('items', JSON.stringify(itemsState))
        }
    }

    const handleCheckout = () => {
        itemsArray.map((item, index) => (item.price = price[index]))
        itemsArray.map((item, index) => (item.amount = amount[index]))

        sessionStorage.setItem('items', JSON.stringify(itemsArray))
    }

    const subTotal = Number(price.reduce((a, b) => a + b, 0)).toFixed(2)
    const delivery = 5.00
    const grandTotal = (Number(subTotal) + delivery).toFixed(2)

    return (
        <Layout sticky={true}>
            <div className={styles.container}>
                {itemsState && itemsState.length > 0 ?
                    <div className={styles['shopping-cart']}>

                        <div className={styles['column-labels']}>
                            <label className={styles['product-image']}>Image</label>
                            <label className={styles['product-details']}>Product</label>
                            <label className={styles['product-quantity']}>Quantity</label>
                            <label className={styles['product-removal']}>Remove</label>
                            <label className={styles['product-line-price-label']}>Total</label>
                        </div>

                        {itemsState.map((item, index) => (
                            <div className={styles.product} key={item.name}>
                                <div className={styles['product-image']}>
                                    <img src={item.image} />
                                </div>
                                <div className={styles['product-details']}>
                                    <div className={styles['product-title']}>{item.name}</div>
                                </div>
                                <div className={styles['product-quantity']}>
                                    <input type="number" value={amount[index]} onChange={(e) => handleChange(e, index)} min="1" />
                                </div>
                                <div className={styles['product-removal']}>
                                    <button className={styles['remove-product']} onClick={() => handleRemove(index)}>
                                        Remove
                                    </button>
                                </div>
                                <div className={styles['product-line-price']}>{price[index].toFixed(2)}</div>
                            </div>
                        ))}

                        <div className={styles.totals}>
                            <div className={styles['totals-item']}>
                                <label>Subtotal</label>
                                <div className={styles['totals-value']} id="cart-subtotal">{subTotal}</div>
                            </div>
                            <div className={styles['totals-item']}>
                                <label>Delivery</label>
                                <div className={styles['totals-value']} id="cart-shipping">{delivery}</div>
                            </div>
                            <div className={`${styles['totals-item']} ${styles['totals-item-total']}`}>
                                <label>Grand Total</label>
                                <div className={styles['totals-value']} id="cart-total">{grandTotal}</div>
                            </div>
                        </div>

                        <Link to={'/checkout'}><button onClick={handleCheckout} className={styles.checkout}>Checkout</button></Link>

                    </div>
                    : <Fragment>
                        <h2 className={styles.empty}>You don't have anything in your basket yet!</h2>
                        <Link to='/menu'><h2 className={styles.menuLink}>Check out our menu!</h2></Link>
                    </Fragment>
                }
            </div>
        </Layout>
    )
}

export default Basket