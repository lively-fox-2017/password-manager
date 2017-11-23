import React, { Component } from 'react'
import Form from './Form'

class Home extends Component {
    render() {
        return (
            <div>
                <h1 className="h1center">Store Your Password below</h1>
                <Form />
            </div>
        )
    }
}

export default Home