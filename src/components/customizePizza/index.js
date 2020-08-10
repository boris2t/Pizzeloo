import React, { useState, useEffect } from 'react'
import styles from './index.module.css'
import fire from '../../fire'
import Spinner from '../common/spinner'

const CustomizePizza = ({ toppings, parentCallback }) => {
    const [ingredients, setIngredients] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentToppings, setCurrentToppings] = useState([])

    useEffect(() => {
        setCurrentToppings(toppings.split(', '))
        const getIngredients = async () => {
            const db = fire.firestore()
            const data = await db.collection('ingredients').get()

            setIngredients(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
            setLoading(false)
        }

        getIngredients()
    }, [])

    const handleChange = (name, price) => {
        const newToppings = [...currentToppings]

        if (currentToppings.includes(name)) {
            const index = newToppings.indexOf(name)
            newToppings.splice(index, 1)
            setCurrentToppings(newToppings)
            parentCallback(newToppings, price, false)
        } else {
            newToppings.push(name)
            setCurrentToppings(newToppings)
            parentCallback(newToppings, price, true)
        }
    }

    return loading
        ? (<Spinner />)
        : (
            <div className={styles.container}>
                {ingredients.map(ingr => (
                    <div className={styles.ingredient} key={ingr.id}>
                        <label>{ingr.name}</label>
                        <input
                            type='checkbox'
                            checked={currentToppings.includes(ingr.name)}
                            onChange={() => handleChange(ingr.name, ingr.price)}
                        />
                    </div>
                ))}
            </div>
        )
}

export default CustomizePizza