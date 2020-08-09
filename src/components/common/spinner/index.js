import React from 'react'
import styles from './index.module.css'

const Spinner = () => {
    return (
        <div className={styles['lds-roller']}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    )
}

export default Spinner