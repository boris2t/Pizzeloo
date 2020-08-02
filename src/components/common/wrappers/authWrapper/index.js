import React from 'react'
import styles from './index.module.css'

const AuthWrapper = (props) => {
    return (
        <div className={styles["auth-wrapper"]}>
            {props.children}
        </div>
    )
}

export default AuthWrapper