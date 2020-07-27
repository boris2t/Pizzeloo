import React, { Component } from 'react'
import styles from './index.module.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/Auth'
import getLinks from '../../functions/getLinks'
import logo from '../../images/logo.png'

class Header extends Component {

    static contextType = AuthContext

    render() {

        const links = getLinks(this.context.currentUser);

        return (
            <header>
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
        )
    }
}

export default Header