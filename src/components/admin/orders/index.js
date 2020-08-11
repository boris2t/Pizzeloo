import React, { useEffect, useState, Fragment } from 'react'
import styles from './index.module.css'
import fire from '../../../fire'
import Spinner from '../../common/spinner'
import DealButton from '../../common/buttons/dealButton'

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

    const handleComplete = async (id) => {
        const db = fire.firestore()
        db.collection('orders')
            .doc(id)
            .set({
                status: 'completed'
            }, { merge: true })

        const data = await db.collection('orders')
            .where('status', '==', 'pending')
            .get()

        setOrders(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    }

    return loading ?
        (<Spinner />)
        : (
            <table className={styles.container}>
                <thead>
                    <tr>
                        <th className={styles['person-label']}>Name</th>
                        <th className={styles['person-label']}>Phone</th>
                        <th className={styles['person-label']}>Adress</th>

                        <th className={styles['item-label']}>Price</th>
                        <th className={styles['item-label']}>Size</th>
                        <th className={styles['item-label']}>Quantity</th>
                        <th className={styles['item-label']}>Item</th>
                    </tr>
                </thead>

                {orders.map(order => (
                    <tbody key={order.id} className={styles['full-order']}>
                        <tr className={styles.order}>
                            <td className={styles['person-info']}>{order.name}</td>
                            <td className={styles['person-info']}>{order.phone}</td>
                            <td className={`${styles['person-info']} ${styles['person-adress']}`}>{order.adress}</td>
                        </tr>

                        {order.orderedItems.map(item => (
                            <Fragment key={item.item}>
                                <tr className={styles.items}>
                                    <td className={styles['items-info']}>{item.item}</td>
                                    <td className={styles['items-info']}>{item.quantity}</td>
                                    <td className={styles['items-info']}>{item.size}</td>
                                    <td className={styles['items-info']}>{Number(item.price).toFixed(2)}</td>
                                </tr>
                                <tr className={styles.customizations}>
                                    <td><p>{item.customization}</p></td>
                                </tr>
                            </Fragment>
                        ))}
                        <tr>
                            <td><DealButton title='COMPLETE' handleOnClick={() => handleComplete(order.id)} /></td>
                        </tr>
                    </tbody>
                ))}
            </table>
        )
}

export default Orders