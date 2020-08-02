import React, { Fragment, useState, useEffect } from 'react'
import Layout from '../../layout'
import styles from './index.module.css'
import ImageButton from '../../common/buttons/imageButton'
import DealCard from '../../dealCard'
import fire from '../../../fire'

const Home = () => {
  const [activeImg, setActiveImg] = useState('firstImg')
  const [offers, setOffers] = useState([])
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

  useEffect(() => {
    const getOffers = async () => {
      const db = fire.firestore()
      const data = await db.collection('offers').get()
      setOffers(data.docs.map(doc => ({...doc.data(), id: doc.id})))
    }

    getOffers()
  }, [])

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
        {
          offers.map(offer => (
            <DealCard
              key={offer.id}
              image={offer.image}
              title={offer.title}
              text={offer.text} />
          ))
        }

      </div>
    </Layout>
  );
};

export default Home