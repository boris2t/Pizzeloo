import React, { useContext, useState, useRef, useEffect } from 'react'
import styles from './index.module.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/Auth'
import getLinks from '../../functions/getLinks'
import logo from '../../images/logo.png'

const Header = () => {

    const { currentUser } = useContext(AuthContext)
    const links = getLinks(currentUser)
    const [isSticky, setSticky] = useState(false);
    const ref = useRef(null);

    const handleScroll = () => {
        if (ref.current) {
            setSticky(ref.current.getBoundingClientRect().top <= 0);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', () => handleScroll);
        };
    }, []);


    const stickyClass = isSticky ? 'sticky' : ''

    return (
        <div className={`${styles['sticky-wrapper']} ${styles[stickyClass]}`} ref={ref}>
            <header className={styles['sticky-inner']}>
                <Link className={styles.logoLink} to="/"><img className={styles.logo} src={logo} alt="Main logo." /></Link>
                <nav>
                    <ul className={styles.nav_links}>
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