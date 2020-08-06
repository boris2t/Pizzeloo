import React, { useContext, useState, useEffect } from 'react'
import styles from './index.module.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/Auth'
import getLinks from '../../functions/getLinks'
import blackLogo from '../../images/logo-black.png'
import whiteLogo from '../../images/logo-white.png'
import basket from '../../images/basket.png'

const Header = ({ sticky }) => {

    const { currentUser } = useContext(AuthContext)
    const links = getLinks(currentUser)
    const [isSticky, setSticky] = useState(sticky);

    const handleScroll = () => {

        if (window.pageYOffset > 0) {
            if (!isSticky) {
                setSticky(true)
            }
        }

        if (window.pageYOffset === 0) {
            setSticky(false)
        }
    };

    useEffect(() => {
        if (!sticky) {
            window.addEventListener('scroll', handleScroll)

            return () => {
                window.removeEventListener('scroll', () => handleScroll)
            }
        }
    }, [])

    const stickyClass = isSticky ? 'moving' : ''
    const stickyLinkClass = stickyClass ? 'movingLink' : ''
    const logo = isSticky ? blackLogo : whiteLogo

    return (
        <div className={`${styles.sticky} ${styles[stickyClass]}`}>
            <header className={styles['sticky-inner']}>
                <Link className={styles.logoLink} to="/"><img className={styles.logo} src={logo} alt="Main logo." /></Link>
                <nav>
                    <ul className={`${styles.nav_links} ${styles[stickyLinkClass]}`}>
                        {
                            links.map(el => {
                                return (
                                    <li key={el.title}>
                                        <Link to={el.link}>
                                            {el.basket ? <img className={styles.basket} src={basket}></img> : el.title}
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default Header