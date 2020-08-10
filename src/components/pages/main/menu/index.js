import React, { useState, useEffect } from 'react'
import styles from './index.module.css'
import Layout from '../../../common/layout'
import fire from '../../../../fire'
import MenuCards from '../../../menuCards'
import { Link } from 'react-router-dom'

const Menu = () => {

    const [pizzas, setPizzas] = useState([])
    const [allPizzas, setAllPizzas] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getPizzas = async () => {
            setLoading(true)

            const db = fire.firestore()
            const data = await db.collection('pizzas').get()

            setPizzas(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
            setAllPizzas(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
            setLoading(false)
        }

        getPizzas()
    }, [])


    const handleFilter = async (filter) => {
        if (!filter) {
            setPizzas(allPizzas)
            return
        }
        const filteredPizzas = allPizzas.filter((pizza) => {
            return pizza[filter]
        })

        setPizzas(filteredPizzas)
    }

    return (
        <Layout sticky={true}>
            <div className={styles.container}>
                <div className={styles.filters}>
                    <button onClick={() => handleFilter()} className={styles.filter}>All</button>
                    <button onClick={() => handleFilter('isSpicy')} className={styles.filter}>Spicy</button>
                    <button onClick={() => handleFilter('isVegerarian')} className={styles.filter}>Vegetarian</button>
                    <Link to='/menu/drinks'><button className={`${styles.filter} ${styles.drinks}`}>Drinks</button></Link>
                </div>

                <div className={styles.row}>
                    <MenuCards items={pizzas} loading={loading} />
                </div>
            </div>
        </Layout>
    )
}

export default Menu