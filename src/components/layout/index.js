import React, { Fragment, Component } from 'react'
import Header from '../header'

class Layout extends Component {
    render() {
        return (
            <Fragment>
                <Header />
                <div>{this.props.children}</div>
            </Fragment>
        )
    }
}

export default Layout