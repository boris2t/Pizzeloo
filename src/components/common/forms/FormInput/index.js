import React from 'react'
import styles from './index.module.css'

const FormInput = (props) => {
    return (
        <div className={styles.container}>
          <label htmlFor={props.id}>
            {props.label}
            <input type={props.type || 'text'} id={props.id} value={props.value} onChange={props.onChange} />
          </label>
        </div>
      )
}

export default FormInput