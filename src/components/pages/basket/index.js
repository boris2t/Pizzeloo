import React, { Fragment, useState, useEffect } from 'react'
import Layout from '../../common/layout'
import styles from './index.module.css'
import { Link } from 'react-router-dom'

const Basket = () => {
    const items = sessionStorage.getItem('items')
    const itemsArray = JSON.parse(items)
    const amounts = itemsArray.map(item => (item.amount))
    const prices = itemsArray.map(item => (item.price))
    const [price, setPrice] = useState(prices)
    const [amount, setAmount] = useState(amounts)
    const [oldAmount, setOldAmount] = useState()
    const [newAmount, setNewAmount] = useState()
    const [index, setIndex] = useState()

    const handleChange = (event, indexParam) => {
        const newAmountArray = [...amount]
        setIndex(indexParam)
        setNewAmount(Number(event.target.value))
        newAmountArray[index] = newAmount
        setOldAmount(amount[index])

        setAmount(newAmountArray)
    }

    useEffect(() => {
        const newPriceArray = [...price]

        console.log(`new amount: ${newAmount}`)
        console.log(`old amount: ${oldAmount}`)

        if (newAmount > Number(oldAmount)) {
            const newPrice = Number(price[index]) * 2
            newPriceArray[index] = newPrice
        } else if (newAmount < Number(oldAmount)) {
            const newPrice = Number(price[index]) / 2
            newPriceArray[index] = newPrice
        }

        setPrice(newPriceArray)
    }, [oldAmount])

    return (
        <Layout sticky={true}>
            <div className={styles.container}>
                {items ?
                    <div className={styles['shopping-cart']}>

                        <div className={styles['column-labels']}>
                            <label className={styles['product-image']}>Image</label>
                            <label className={styles['product-details']}>Product</label>
                            <label className={styles['product-quantity']}>Quantity</label>
                            <label className={styles['product-removal']}>Remove</label>
                            <label className={styles['product-line-price']}>Total</label>
                        </div>

                        {itemsArray.map((item, index) => (
                            <div className={styles.product} key={item.name}>
                                <div className={styles['product-image']}>
                                    <img src={item.image} />
                                </div>
                                <div className={styles['product-details']}>
                                    <div className={styles['product-title']}>{item.name}</div>
                                </div>
                                <div className={styles['product-quantity']}>
                                    <input type="number" value={amount[index]} onChange={(e) => handleChange(e, index, item.amount)} min="1" />
                                </div>
                                <div className={styles['product-removal']}>
                                    <button className={styles['remove-product']}>
                                        Remove
                                    </button>
                                </div>
                                <div className={styles['product-line-price']}>{price[index].toFixed(2)}</div>
                            </div>
                        ))}

                        <div className={styles.totals}>
                            <div className={styles['totals-item']}>
                                <label>Subtotal</label>
                                <div className={styles['totals-value']} id="cart-subtotal">71.97</div>
                            </div>
                            <div className={styles['totals-item']}>
                                <label>Delivery</label>
                                <div className={styles['totals-value']} id="cart-shipping">15.00</div>
                            </div>
                            <div className={`${styles['totals-item']} ${styles['totals-item-total']}`}>
                                <label>Grand Total</label>
                                <div className={styles['totals-value']} id="cart-total">90.57</div>
                            </div>
                        </div>

                        <button className={styles.checkout}>Checkout</button>

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