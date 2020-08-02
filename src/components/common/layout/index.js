import React, { Fragment, Component } from 'react'
import Header from '../../header'
import Footer from '../../footer'

class Layout extends Component {
    render() {
        return (
            <Fragment>
                <Header />
                <div>{this.props.children}</div>
                <Footer />
            </Fragment>
        )
    }
}

export default Layout