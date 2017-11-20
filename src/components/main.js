import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import {
    fetchData,
    postData,
    delData
} from '../actions/index'

class Main extends Component {
    constructor(props) {
        super()
        this.state = {
            password: '',
            username: '',
            URL: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const state = this.state
        state[event.target.name] = event.target.value;
        this.setState(state);
    }
    
    handleSubmit(event) {
        event.preventDefault();
        this.props.postData(this.state)
    }

    render() {
        const { URL,username,password } = this.state
        const upperCase = /^(?=.*\d)(?=.*[A-Z]).+$/;
        const lowerCase = /^(?=.*[a-z])(?=.*\d).+$/;
        const specialCase =/^(?=.*\d)(?=.*(_|[^\w])).+$/;
        const number =/^(?=.*[0-9])(?=.*\d).+$/;
        const minLength=/^(?=.*\d)(.{5,15}).+$/;
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>
                                Id
                            </th>
                            <th>
                                username
                            </th>
                            <th>
                                password
                            </th>
                            <th>
                                url
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                {this.props.items !== undefined ?
                this.props.items.map((p, idx) => {
                    return (
                        <tr key={idx}>
                            <td>{ p.id }</td>
                            <td>{ p.username }</td>
                            <td>{ p.password }</td>
                            <td>{ p.URL }</td>
                            <td><Link to={`/${p.id}/edit`}>Edit</Link></td>
                            <td><button onClick={() => {this.props.delData(p.id)}}>Delete</button></td>
                        </tr>
                    )
                }) :
                <tr>
                    <td>loading</td>
                </tr>
                }
                    </tbody>
                </table>
                <form onSubmit={this.handleSubmit}>
                <label>
                  URL:
                  <input name="URL" type="text" value={URL} onChange={this.handleChange} />
                  <br/>
                  Username:
                  <input name="username" type="text" value={username} onChange={this.handleChange}/>
                  <br/>
                  Password:
                  <input name="password" type="password" value={password} onChange={this.handleChange} />
                </label>
                <br/>
                {upperCase.test(this.state.password) && lowerCase.test(this.state.password) && specialCase.test(this.state.password)
                && number.test(this.state.password) && minLength.test(this.state.password) ?
                <input type="submit" value="Submit" />:
                <div></div>
                }
                </form>
                {upperCase.test(this.state.password) ?
                <div>Has one uppercase</div>:
                <div>Has no uppercase</div>}
                {lowerCase.test(this.state.password) ?
                <div>Has one lowercase</div>:
                <div>Has no lowercase</div>}
                {specialCase.test(this.state.password) ?
                <div>Has one specialcase</div>:
                <div>Has no specialcase</div>}
                {number.test(this.state.password) ?
                <div>Has one number</div>:
                <div>Has no number</div>}
                {minLength.test(this.state.password) ?
                <div>Length is above 5</div>:
                <div>Length is below 5 or over 15</div>}
            </div>
        )
    }

    componentWillMount() {
        this.props.fetchData()
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(fetchData()),
        postData: (data) => dispatch(postData(data)),
        delData: (id) => dispatch(delData(id))
    }
}

const maptStateToProps = (state) => {
    return {
        items : state.items
    }
}

var ConnectedComponent = connect(
    maptStateToProps, mapDispatchToProps
)(Main)

export default ConnectedComponent