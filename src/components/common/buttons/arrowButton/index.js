import React from 'react'
import styles from './index.module.css'

const ArrowButton = (props) => {

    return (
        <button className={`${styles.arrow} ${styles[props.direction]}`} onClick={props.handleOnClick}></button>
    )
}

export default ArrowButton