import React, { useState } from 'react'
import styles from './index.module.css'
import Layout from '../../common/layout'
import CreateOffer from '../../admin/createOffer'
import AddIngredient from '../../admin/addIngredient'
import CreatePizza from '../../admin/createPizza'
import Orders from '../../admin/orders'
import AddDrink from '../../admin/addDrink'

const Admin = () => {

    const [component, setComponent] = useState(<Orders />)

    const handleCreateOffer = () => {
        setComponent(<CreateOffer />)
    }

    const handleAddIngredient = () => {
        setComponent(<AddIngredient />)
    }

    const handleAddDrink = () => {
        setComponent(<AddDrink />)
    }

    const handleCreatePizza = () => {
        setComponent(<CreatePizza />)
    }

    const handleGetOrders = () => {
        setComponent(<Orders />)
    }

    return (
        <Layout sticky={true}>
            <div className={styles.all}>
                <div className={styles['btn-container']}>
                    <button onClick={handleCreateOffer} className={styles.btn}>Create Offer</button>
                    <button onClick={handleCreatePizza} className={styles.btn}>Create Pizza</button>
                    <button onClick={handleAddDrink} className={styles.btn}>Add Drink</button>
                    <button onClick={handleAddIngredient} className={styles.btn}>Add Ingredient</button>
                    <button onClick={handleGetOrders} className={styles.btn}>Orders</button>
                </div>
                {component}
            </div>
        </Layout>
    )
}

export default Admin