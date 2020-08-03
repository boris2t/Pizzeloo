import React, { Component } from 'react'
import fire from '../fire'
import Spinner from './common/spinner'

class Logout extends Component {
    componentDidMount() {
        fire.auth().signOut()
        this.props.history.push('/')
      }

    render() {
        return (
            <Spinner />
        )
    }
}

export default Logout