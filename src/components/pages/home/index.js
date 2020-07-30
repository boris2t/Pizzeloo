import React, { useState, useEffect } from 'react'
import Layout from '../../layout'
import styles from './index.module.css'

const Home = () => {
  const [activeImg, setActiveImg] = useState('firstImg')
  const images = ['firstImg', 'secondImg', 'thirdImg']

  useEffect(() => {
    const timer = setInterval(() => {
      switch (activeImg) {
        case 'firstImg':
          return setActiveImg('secondImg')
        case 'secondImg':
          return setActiveImg('thirdImg')
        default:
          return setActiveImg('firstImg')
      }
    }, 3500);
    return () => clearInterval(timer);
  });

  return (
    <Layout>
      <div className={styles.container}>
        {images.map(image => {
          return (
            <div key={image}
              className={`${styles.img} ${styles[`${image}`]} ${(image === activeImg) ? styles.active : ''}`}>
            </div>)
        })}
      </div>

    </Layout>
  );
};

export default Home