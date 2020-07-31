import React from 'react'
import styles from './index.module.css'

const ImageButton = (props) => {
    return (
        <button
            className={`${styles.btn} ${styles[props.image === props.active ? 'checked' : '']}`}
            type='button'
            onClick={() => props.setActive(props.image)}>
        </button>
    )
}

export default ImageButton