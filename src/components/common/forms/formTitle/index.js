import React from 'react'
import styles from './index.module.css'

const FormTitle = (props) => {
    return (
        <h2 className={styles.title}>{props.title}</h2>
    )
}

export default FormTitle