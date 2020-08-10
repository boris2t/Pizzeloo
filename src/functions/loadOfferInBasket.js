const loadOfferInBasket = (data, dbData) => {
    const basketValue = sessionStorage.getItem('items')
        const basketArray = basketValue == null ? [] : Array.from(JSON.parse(basketValue))
        const pizza = {
            name: data.pizza.name,
            amount: data.pizza.amount,
            price: Number(data.pizza.price) * Number(data.pizza.amount),
            priceForOne: data.pizza.price,
            image: dbData.pizza.image,
        }

        const drink = {
            name: data.drink.name,
            amount: data.drink.amount,
            price: Number(data.drink.price) * Number(data.drink.amount),
            priceForOne: data.drink.price,
            image: dbData.drink.image,
            drink: 'drink'
        }

        basketArray.push(pizza)
        basketArray.push(drink)
        sessionStorage.setItem('items', JSON.stringify(basketArray))
}

export default loadOfferInBasket