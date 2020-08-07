import React from 'react'
import styles from './index.module.css'
import { Link } from 'react-router-dom'

const DontHaveAccount = () => {
    return (
        <p className={styles.signUpParagraph}>
            Don't have an account yet?
            <Link to="signup" className={styles.signUpLink}>Sign Up!</Link>
        </p>
    )
}

export default DontHaveAccount