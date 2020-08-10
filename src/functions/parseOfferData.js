const parseOfferData = (offer) => {
    const rawPizzaData = offer.pizza
    const rawDrinkData = offer.drink

    const pizzaData = rawPizzaData.split('/')
    const pizzaObj = {
        name: pizzaData[0],
        size: pizzaData[1],
        amount: pizzaData[2],
        price: pizzaData[3],
    }

    const drinkData = rawDrinkData.split('/')
    const drinkObj = {
        name: drinkData[0],
        amount: drinkData[1],
        price: drinkData[2],
    }

    const data = {
        pizza: pizzaObj,
        drink: drinkObj
    }

    return data
}

export default parseOfferData