import React, { Fragment, useState, useEffect } from 'react'
import Layout from '../../layout'
import styles from './index.module.css'
import ImageButton from '../../imageButton'

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
        {images.map((image, index) => {
          return (
            <Fragment key={index}>
              <div
                className={`${styles.img} ${styles[`${image}`]} ${(image === activeImg) ? styles.active : ''}`}>
              </div>
            </Fragment>
          )
        })}
        <ImageButton image='firstImg' active={activeImg} setActive={setActiveImg}/>
        <ImageButton image='secondImg' active={activeImg} setActive={setActiveImg}/>
        <ImageButton image='thirdImg' active={activeImg} setActive={setActiveImg}/>
      </div>

      <div className={styles['lower-container']}>

      </div>
    </Layout>
  );
};

export default Home