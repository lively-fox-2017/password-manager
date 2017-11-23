import React, { Component } from 'react'
import { 
    deleteData, 
    getAllData, 
    selectToEdit 
} from '../actions/PasswordActions'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

class SavedPasswordClass extends Component {
    componentDidMount() {
        if (this.props.data_password.length === 0) {
            this.props.getAllData()
        }
    }

    render() {
        return (
            <tbody>
                {this.props.data_password.map((password) => {
                    return (
                        <tr className="warning" key={password.id}>
                            <td>{password.id}</td>
                            <td>{password.data_url}</td>
                            <td>{password.username}</td>
                            <td>{password.password}</td>
                            <td>{password.createdAt}</td>
                            <td>{password.updatedAt}</td>
                            <td><Link to="/edit" onClick={() => { this.editPass(password) }} href="#" className="btn btn-primary">Edit</Link></td>
                            <td><button onClick={() => { this.props.deleteData(password.id) }} href="#" className="btn btn-danger">Delete</button></td>
                        </tr>
                    )
                })}
            </tbody>
        )
    }

    editPass(val) {
        var arr = []
        arr.push(val)
        this.props.selectToEdit(arr)
    }

}

const mapState = (state) => {
    return {
        data_password: state.passReducer.data_password
    }
}

const mapActions = (dispatch) => {
    return {
        deleteData: (id) => dispatch(deleteData(id)),
        getAllData: () => dispatch(getAllData()),
        selectToEdit: (data) => dispatch(selectToEdit(data))
    }
}

const connectedSavedPassword = connect(
    mapState, 
    mapActions
)(SavedPasswordClass)

export default connectedSavedPassword
