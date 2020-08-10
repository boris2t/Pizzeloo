import React from 'react'
import styles from './index.module.css'
import DealButton from '../common/buttons/dealButton'
import Spinner from '../common/spinner'
import { useHistory } from 'react-router'
import parseOfferData from '../../functions/parseOfferData'
import getDbItemData from '../../functions/getDbItemData'
import loadOfferInBasket from '../../functions/loadOfferInBasket'

const DealCards = ({ offers, loading }) => {
    const history = useHistory()

    const handleGet = async (offer) => {
        const data = parseOfferData(offer)
        const dbData = await getDbItemData(data)
        loadOfferInBasket(data, dbData)
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