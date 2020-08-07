import React from 'react'
import styles from './index.module.css'

const IncorrectInput = ({ message }) => {
    return ( 
        <h3 className={styles.incorrect}>{message}</h3>
     )
}
 
export default IncorrectInput