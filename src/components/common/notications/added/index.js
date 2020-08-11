import React from 'react'
import styles from './index.module.css'

const Added = ({ name }) => {
    return (  
        <div className={styles.container}>
            <p>You've successfully added {name} in your basket!</p>
        </div>
    )
}
 
export default Added