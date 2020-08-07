import React from 'react'
import styles from './index.module.css'

const ValidationFormInput = ({ label, id, register, errors, message, ...rest}) => {

    return (
        <div className={styles["input-group"]}>
            <input
                id={id}
                ref={register}
                {...rest}/>
            <label htmlFor={id}>{label}</label>
            {errors[id] && (<p>{message}</p>)}
        </div>
    )
}

export default ValidationFormInput