import React from 'react'
import styles from './index.module.css'
import DealButton from '../common/buttons/dealButton'
import Spinner from '../common/spinner'
import fire from '../../fire'
import { useHistory } from 'react-router'

const DealCards = ({ offers, loading }) => {
    const history = useHistory()

    const handleGet = async (offer) => {
        const rawPizzaData = offer.pizza
        const rawDrinkData = offer.drink

        const pizzaData = rawPizzaData.split('/')
        const pizzaObj = {
            name: pizzaData[0],
            size: pizzaData[1],
            amount: pizzaData[2],
            price: pizzaData[3],
            pricePerOne: pizzaData[4]
        }

        const drinkData = rawDrinkData.split('/')
        const drinkObj = {
            name: drinkData[0],
            amount: drinkData[1],
            price: drinkData[2],
            pricePerOne: drinkData[3]
        }

        const db = fire.firestore()
        const realPizzaData = await db.collection('pizzas').where('name', '==', pizzaObj.name).get()
        const realDrinkData = await db.collection('drinks').where('name', '==', drinkObj.name).get()
        const realPizza = realPizzaData.docs.map(doc => doc.data())[0]
        const realDrink = realDrinkData.docs.map(doc => doc.data())[0]

        const basketValue = sessionStorage.getItem('items')
        const basketArray = basketValue == null ? [] : Array.from(JSON.parse(basketValue))
        const pizza = {
            name: pizzaObj.name,
            amount: pizzaObj.amount,
            price: pizzaObj.price,
            priceForOne: pizzaObj.pricePerOne,
            image: realPizza.image,
        }

        const drink = {
            name: drinkObj.name,
            amount: drinkObj.amount,
            price: drinkObj.price,
            priceForOne: drinkObj.pricePerOne,
            image: realDrink.image,
            drink: 'drink'
        }

        basketArray.push(pizza)
        basketArray.push(drink)
        sessionStorage.setItem('items', JSON.stringify(basketArray))

        history.push('/basket')
    }

    return loading ? (
        <Spinner />
    ) : (
            offers.map(offer => (
                <div key={offer.id} className={styles.card}>
                    <img src={offer.image} alt='meal'></img>
                    <h1>{offer.title}</h1>
                    <p>{offer.text}</p>
                    <DealButton title='GET THIS DEAL!' handleOnClick={() => handleGet(offer)}/>
                </div>
            ))
        )
}

export default DealCards