import React, { useContext, useState, useRef, useEffect } from 'react'
import styles from './index.module.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/Auth'
import getLinks from '../../functions/getLinks'
import blackLogo from '../../images/logo3.png'
import whiteLogo from '../../images/logo-white.png'

const Header = () => {

    const { currentUser } = useContext(AuthContext)
    const links = getLinks(currentUser)
    const [isSticky, setSticky] = useState(false);
    const ref = useRef(null)

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
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', () => handleScroll)
        }
    }, [])

    const stickyClass = isSticky ? 'moving' : ''
    const stickyLinkClass = stickyClass ? 'movingLink' : ''
    const logo = isSticky ? blackLogo : whiteLogo
    
    return (
        <div className={`${styles.sticky} ${styles[stickyClass]}`} ref={ref}>
            <header className={styles['sticky-inner']}>
                <Link className={styles.logoLink} to="/"><img className={styles.logo} src={logo} alt="Main logo." /></Link>
                <nav>
                    <ul className={`${styles.nav_links} ${styles[stickyLinkClass]}`}>
                        {
                            links.map(el => {
                                return (
                                    <li key={el.title}>
                                        <Link to={el.link}>{el.title}</Link>
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