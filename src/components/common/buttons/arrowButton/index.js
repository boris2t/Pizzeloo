import React from 'react'
import styles from './index.module.css'

const ArrowButton = ({handleOnClick}) => {
    return (
        <button className={styles.arrow} onClick={handleOnClick}></button>
    )
}

export default ArrowButton