import React, { useState, useEffect } from 'react'
import styles from './index.module.css'
import Layout from '../../common/layout'
import MenuCards from '../../menuCards'
import { Link } from 'react-router-dom'
import fire from '../../../fire'
import showAddedNotification from '../../../functions/showAddedNotification'


const Drinks = () => {
    const [drinks, setDrinks] = useState([])
    const [loading, setLoading] = useState(false)
    const [added, setAdded] = useState()

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
                {added}
                <div className={styles.filters}>
                    <Link to='/menu'><button className={styles.filter}>Pizzas</button></Link>
                </div>

                <div className={styles.row}>
                    <MenuCards items={drinks} loading={loading} type='drinks' addedCallback={showAddedNotification} setAdded={setAdded}/>
                </div>
            </div>
        </Layout>
    )
}

export default Drinks