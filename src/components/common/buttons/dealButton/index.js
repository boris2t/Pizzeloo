import React from 'react'
import styles from './index.module.css'

const DealButton = (props) => {
    return (
        <button onClick={props.handleOnClick} className={styles.btn}>{props.title}</button>
    )
}

export default DealButton