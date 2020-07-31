import React from 'react'
import styles from './index.module.css'
import DealButton from '../dealButton'

const DealCard = (props) => {
    return (
        <div className={styles.card}>
            <img src={props.image} alt='meal'></img>
            <h1>{props.title}</h1>
            <p>{props.text}</p>
            <DealButton title='GET THIS DEAL!'/>
        </div>
    )
}

export default DealCard