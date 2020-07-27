import React, { Component } from 'react'
import fire from '../fire'

class Logout extends Component {
    componentDidMount() {
        fire.auth().signOut()
        this.props.history.push('/')
      }

    render() {
        return (
            <p>Loading...</p>
        )
    }
}

export default Logout