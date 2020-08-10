import fire from '../fire'

const getDbItemData = async (data) => {
    const db = fire.firestore()
    const pizzaData = await db.collection('pizzas').where('name', '==', data.pizza.name).get()
    const drinkData = await db.collection('drinks').where('name', '==', data.drink.name).get()

    const pizza = pizzaData.docs.map(doc => doc.data())[0]
    const drink = drinkData.docs.map(doc => doc.data())[0]

    const dbData = {
        pizza: pizza,
        drink: drink
    }

    return dbData
}

export default getDbItemData