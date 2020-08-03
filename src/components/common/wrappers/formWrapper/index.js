import React from 'react'
import styles from './index.module.css'

const FormWrapper = (props) => {
    return (
        <div className={styles.container}>
            {props.children}
        </div>
    );
}

export default FormWrapper