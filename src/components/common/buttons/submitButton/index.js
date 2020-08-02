import React from 'react'
import styles from './index.module.css'

const SubmitButton = (props) => {
    return (
        <input type="submit" value={props.value} className={styles["submit-btn"]} />
    )
}

export default SubmitButton