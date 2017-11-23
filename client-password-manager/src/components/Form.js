import React, { Component } from 'react'
import { 
    postDataServer, 
    patchUpdateData, 
    destroyDataToEdit 
} from '../actions/PasswordActions'
import { connect } from 'react-redux'


class FormPassword extends Component {
    constructor() {
        super()
        this.state = {
            url: '',
            username: '',
            password: '',
            upperCasePass: false,
            lowerCasePass: false,
            hasSpecialChar: false,
            hasNumber: false,
            achieveMinLength: false,
            validPassword: false,
            status: 'added !'
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleChange(e) {
        const name = e.target.name
        this.setState({
            [name]: e.target.value
        })
        if (name === 'password') {
            const valPass = e.target.value
            const lengthMin = this.minLengthCheck(valPass)
            const upperCase = this.upperCaseCheck(valPass)
            const lowerCase = this.lowerCaseCheck(valPass)
            const hasNumber = this.numberCheck(valPass)
            const specialChar = this.specialCharCheck(valPass)
            this.isValidPass(upperCase, lowerCase, hasNumber, specialChar, lengthMin)
        }
    }

    minLengthCheck(valPass) {
        if (valPass.length >= 8) {
            this.setState({ achieveMinLength: true })
            return true
        } else {
            this.setState({ achieveMinLength: false })
            return false
        }
    }

    upperCaseCheck(valPass) {
        if (/[A-Z]/.test(valPass)) {
            this.setState({ upperCasePass: true })
            return true
        } else {
            this.setState({ upperCasePass: false })
            return false
        }
    }

    lowerCaseCheck(valPass) {
        if (/[a-z]/.test(valPass)) {
            console.log('tes in lowercase',valPass)
            this.setState({ lowerCasePass: true })
            return true
        } else {
            this.setState({ lowerCasePass: false })
            return false
        }
    }

    numberCheck(valPass) {
        if (/\d+/g.test(valPass)) {
            this.setState({ hasNumber: true })
            return true
        } else {
            this.setState({ hasNumber: false })
            return false
        }
    }

    specialCharCheck(valPass) {
        if (/[^A-Za-z0-9]/g.test(valPass) && /\S/g.test(valPass)) {
            this.setState({ hasSpecialChar: true })
            return true
        } else {
            this.setState({ hasSpecialChar: false })
            return false
        }
    }


    isValidPass(upper, lower, number, specialChar, lengthPass) {
        if (upper && lower && number && specialChar && lengthPass) {
            this.setState({ validPassword: true })
        } else {
            this.setState({ validPassword: false })
        }
    }

    handleSubmit(e) {
        e.preventDefault()
        if (this.state.status === 'added !') {

            const newPass = {
                data_url: this.state.url,
                username: this.state.username,
                password: this.state.password,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            this.props.postDataServer(newPass)

        } else {
            const newPass = {
                id: this.props.editPass[0].id,
                data_url: this.state.url,
                username: this.state.username,
                password: this.state.password,
                updatedAt: new Date()
            }
            this.props.patchUpdateData(newPass)
            this.props.destroyDataToEdit()
        }

        alert(`your password data ${this.state.status}`)
        this.clearState()

    }

    clearState () {
        this.setState({
            url: '',
            username: '',
            password: '',
            hasUpperCase: false,
            hasLowerCase: false,
            hasSpecialChar: false,
            hasNumber: false,
            achieveMinLength: false,
            validPassword: false,
            status: 'added !'
        })
    }

    componentDidMount() {
        if (this.props.editPass.length > 0) {
            this.setState({
                url: this.props.editPass[0].data_url,
                username: this.props.editPass[0].username,
                status: 'edit'
            })
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} className="form-horizontal">
                    {this.divInput.call(this)}
                    <div className="form-group">
                        <div className="col-lg-2"></div>
                        <div className="col-lg-10">
                            <h4 className="text-warning">Password Strength : </h4>
                            <p>
                                {this.callMinLength.call(this)}
                                Minimum length 8 character
                            </p>
                            <p>
                                {this.callUpperCase.call(this)}
                                At least has one upper case character
                            </p>
                            <p>
                                {this.callLowerCase.call(this)}
                                At least has one lower case character
                            </p>
                            <p>
                                {this.callSpecialChar.call(this)}
                                At least has one special character (!@#$%^&*...)
                            </p>
                            <p>
                                {this.callnumber.call(this)}
                                At least has one number character
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-lg-2"></div>
                        <div className="col-lg-10">
                        {this.showStoreButton.call(this)}
                        </div>
                    </div>
                </form>

            </div>
        )
    }

    divInput () {
        return <div><div className="form-group">
            <label className="col-lg-2 control-label">URL</label>
            <div className="col-lg-10">
                <div className="input-group">
                    <span className="input-group-addon"> http:// </span>
                    <input
                        name="url"
                        onChange={this.handleChange}
                        value={this.state.url}
                        type="text"
                        className="form-control"
                        placeholder="URL" />
                </div>
            </div>
        </div>
            <div className="form-group">
                <label className="col-lg-2 control-label">Username</label>
                <div className="col-lg-10">
                    <input
                        name="username"
                        onChange={this.handleChange}
                        value={this.state.username}
                        type="text"
                        className="form-control"
                        placeholder="Username" />
                </div>
            </div>
            <div className="form-group">
                <label className="col-lg-2 control-label">Password</label>
                <div className="col-lg-10">
                    <input
                        name="password"
                        onChange={this.handleChange}
                        value={this.state.password}
                        type="password"
                        className="form-control"
                        placeholder="Password" />
                </div>
            </div></div>
    }

    showStoreButton () {
        if (this.state.validPassword) {
            return <button type="submit" className="btn btn-primary">Proceed</button>
        } else {
            return <button type="submit" className="btn btn-primary" disabled>Proceed</button>
        }
    }

    callMinLength () {
        if (this.state.achieveMinLength) {
            return <span>[ X ] - </span>
        } else {
            return <span>[   ] - </span>
        }
    }
    callUpperCase () {
        if (this.state.upperCasePass) {
            return <span>[ X ] - </span>
        } else {
            return <span>[   ] - </span>
        }
    }
    callLowerCase () {
        if (this.state.lowerCasePass) {
            return <span>[ X ] - </span>
        } else {
            return <span>[   ] - </span>
        }
    }
    callSpecialChar () {
        if (this.state.hasSpecialChar) {
            return <span>[ X ] - </span>
        } else {
            return <span>[   ] - </span>
        }
    }
    callnumber () {
        if (this.state.hasNumber) {
            return <span>[ X ] - </span>
        } else {
            return <span>[   ] - </span>
        }
    }
}

const mapState = (state) => {
    return {
        editPass: state.passReducer.editPass
    }
}

const mapActions = (dispatch) => {
    return {
        postDataServer: (p) => dispatch(postDataServer(p)),
        patchUpdateData: (data) => dispatch(patchUpdateData(data)),
        destroyDataToEdit: () => dispatch(destroyDataToEdit())
    }
}


const FormPasswordCon = connect(
    mapState, 
    mapActions
)(FormPassword)

export default FormPasswordCon

