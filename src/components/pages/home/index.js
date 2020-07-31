import React, { Fragment, useState, useEffect } from 'react'
import Layout from '../../layout'
import styles from './index.module.css'
import ImageButton from '../../imageButton'
import offer1 from '../../../images/offer1.jpg'
import offer2 from '../../../images/offer2.png'
import offer3 from '../../../images/offer3.png'
import offer4 from '../../../images/offer4.png'
import DealCard from '../../dealCard'

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
    return () => clearInterval(timer)
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
        <ImageButton image='firstImg' active={activeImg} setActive={setActiveImg} />
        <ImageButton image='secondImg' active={activeImg} setActive={setActiveImg} />
        <ImageButton image='thirdImg' active={activeImg} setActive={setActiveImg} />
      </div>

      <div className={styles['lower-container']}>
        <DealCard
          image={offer1}
          title='Pizza + Beer'
          text='Get your favourite large pizza + 500ml beer for just $5.99!' />

        <DealCard
          image={offer3}
          title='Super Combo'
          text='Large pizza, chicken nuggets + 2 x 500ml Heineken beers for just $9.99 Now with free delivery!' />

        <DealCard
          image={offer4}
          title='Pizza + Cola'
          text='Get your favourite large pizza + Coca Cola 1litre for just $7.99!' />

        <DealCard
          image={offer2}
          title='Pizza + Beer'
          text='Get your favourite large pizza + 1litre of Zagorka beer for just $6.99!' />

      </div>
    </Layout>
  );
};

export default Home