import React, { useState } from 'react'
import styles from './index.module.css'
import Layout from '../../common/layout'
import CreateOffer from '../../admin/createOffer'
import AddIngredient from '../../admin/addIngredient'
import CreatePizza from '../../admin/createPizza'
import Orders from '../../admin/orders'

const Admin = () => {

    const [component, setComponent] = useState()

    const handleCreateOffer = () => {
        setComponent(<CreateOffer />)
    }

    const handleAddIngredient = () => {
        setComponent(<AddIngredient />)
    }

    const handleCreatePizza = () => {
        setComponent(<CreatePizza />)
    }

    const handleGetOrders = () => {
        setComponent(<Orders />)
    }

    return (
        <Layout sticky={true}>
            <div className={styles['btn-container']}>
                <button onClick={handleCreateOffer} className={styles.btn}>Create Offer</button>
                <button onClick={handleCreatePizza} className={styles.btn}>Create Pizza</button>
                <button onClick={handleAddIngredient} className={styles.btn}>Add Ingredient</button>
                <button onClick={handleGetOrders} className={styles.btn}>Orders</button>
            </div>
            {component}
        </Layout>
    )
}

export default Admin