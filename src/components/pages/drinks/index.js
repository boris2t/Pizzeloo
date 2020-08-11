import React, { useState, useEffect } from 'react'
import styles from './index.module.css'
import Layout from '../../common/layout'
import MenuCards from '../../menuCards'
import { Link } from 'react-router-dom'
import fire from '../../../fire'

const Drinks = () => {
    const [drinks, setDrinks] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getDrinks = async () => {
            setLoading(true)

            const db = fire.firestore()
            const data = await db.collection('drinks').get()

            setDrinks(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
            setLoading(false)
        }

        getDrinks()
    }, [])

    return (
        <Layout sticky={true}>
            <div className={styles.container}>
                <div className={styles.filters}>
                    <Link to='/menu'><button className={styles.filter}>Pizzas</button></Link>
                </div>

                <div className={styles.row}>
                    <MenuCards items={drinks} loading={loading} type='drinks' />
                </div>
            </div>
        </Layout>
    )
}

export default Drinks