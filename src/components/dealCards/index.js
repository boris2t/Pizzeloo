import React from 'react'
import styles from './index.module.css'
import DealButton from '../common/buttons/dealButton'
import Spinner from '../common/spinner'

const DealCards = ({ offers, loading }) => {

    return loading ? (
        <Spinner />
    ) : (
            offers.map(offer => (
                <div key={offer.id} className={styles.card}>
                    <img src={offer.image} alt='meal'></img>
                    <h1>{offer.title}</h1>
                    <p>{offer.text}</p>
                    <DealButton title='GET THIS DEAL!' />
                </div>
            ))
        )
}

export default DealCards