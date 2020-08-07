import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import fire from '../../../fire'
import Spinner from '../../common/spinner'

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getOrders = async () => {
            setLoading(true)
            const db = fire.firestore()
            const data = await db.collection('orders')
                .where('status', '==', 'pending')
                .get()

            setOrders(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
            setLoading(false)
        }

        getOrders()
    }, [])

    return loading ?
        (<Spinner />)
        : (
            <div className={styles.container}>
                {orders.map(order => (
                    <div key={order.id}>
                        <p>{order.name}</p>
                        <p>{order.phone}</p>
                        <p>{order.adress}</p>
                        <p>Items:</p>
                        {order.orderedItems.map(item => (
                            <div key={item.item}>
                                <p>{item.item}</p>
                                <p>{item.quantity}</p>
                                <p>{item.size}</p>
                                <p>{item.price}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        )
}

export default Orders