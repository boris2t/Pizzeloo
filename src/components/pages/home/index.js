import React, { Fragment, useState, useEffect } from 'react'
import Layout from '../../common/layout'
import styles from './index.module.css'
import ImageButton from '../../common/buttons/imageButton'
import DealCards from '../../dealCards'
import fire from '../../../fire'
import ArrowButton from '../../common/buttons/arrowButton'

const Home = () => {
  const [activeImg, setActiveImg] = useState('firstImg')
  const [offers, setOffers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const pageSize = 4
  const images = ['firstImg', 'secondImg', 'thirdImg']

  //set next background image
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
      setLoading(true)

      const db = fire.firestore()
      const data = await db.collection('offers').get()

      setOffers(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
      setLoading(false)
    }

    getOffers()
  }, [])

  //Get current offers
  const indexOfLastOffer = currentPage * pageSize
  const indexOfFirstOffer = indexOfLastOffer - pageSize
  const currentOffers = offers.slice(indexOfFirstOffer, indexOfLastOffer)

  const handleNextOffers = () => {
    //if no more offers, we go back to the first page
    if (indexOfLastOffer >= offers.length) {
      setCurrentPage(1)
    } else {
      setCurrentPage(currentPage + 1)
    }
  }


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
        <DealCards offers={currentOffers} loading={loading}/>
        <ArrowButton handleOnClick={handleNextOffers}/>
      </div>
    </Layout>
  );
};

export default Home