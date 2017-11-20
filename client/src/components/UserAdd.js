import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addNewUserAPI, validatePassword } from '../actions/user'
import chance from 'chance'
import owasp from 'owasp-password-strength-test'
// import { fetchAllUserAPI } from '../actions/user'
const createId = new chance()

owasp.config({
  allowPassphrases       : true,
  maxLength              : 128,
  minLength              : 5,
  minPhraseLength        : 20,
  minOptionalTestsToPass : 1,
})

class UserAdd extends Component {
  constructor(props){
    super(props)
    this.state = {
      formUser:{
        id: '',
        url: '',
        username: '',
        password: '',
        // createdAt: '',
        // updatedAt: ''
        createdAt: new Date(),
        updatedAt: new Date()
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.addNewUser = this.addNewUser.bind(this)
  }
  cekPass(password){
    let statePwdContaining = this.props.pwdContaining
    statePwdContaining.upperCase=false
    statePwdContaining.lowerCase=false
    statePwdContaining.specialCase=false
    statePwdContaining.number=false
    statePwdContaining.lengthMin=false
    let result = owasp.test(password)
    for (var i = 0; i < result.passedTests.length; i++) {
      if (result.passedTests[i]===0) statePwdContaining.lengthMin=true
      if (result.passedTests[i]===3) statePwdContaining.lowerCase=true
      if (result.passedTests[i]===4) statePwdContaining.upperCase=true
      if (result.passedTests[i]===5) statePwdContaining.number=true
      if (result.passedTests[i]===6) statePwdContaining.specialCase=true
    }
    this.setState({statePwdContaining})
  }
  handleChange(e){
    let state = this.state.formUser
    state[e.target.name] = e.target.value
    this.setState(state)
    if (e.target.name==='password') {
      this.cekPass(e.target.value)
    }
    e.preventDefault();
  }
  setBlankForm(){
    this.setState.formUser = {
      id:'',
      url:'',
      username:'',
      password:''
    }
  }
  addNewUser(e){
    let newFormUser = this.state.formUser
    newFormUser.id = createId.guid()
    // this.state.formUser.createdAt = new Date
    // this.state.formUser.updatedAt = new Date
    if (owasp.test(newFormUser.password).errors.length === 0) {
      this.props.addNewUserAPI(newFormUser)
    } else {
      alert('Your password not strong!')
    }
    e.preventDefault();
  }
  render(){
    let validatePwd = this.props.pwdContaining
    // console.log('cek validate', validatePwd);
    return(
      <div className="container">
        <h1 align="center">Add User</h1>
        <div className="form" style={{width: 300}}>
          <div className="form-group">
            <label>URL</label>
            <input onChange={this.handleChange} className="form-control" name="url" type="text" placeholder="Type your URL"/>
          </div>
          <div className="form-group">
            <label>Username</label>
            <input onChange={this.handleChange} className="form-control" name="username" type="text" placeholder="Type your username"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input onChange={this.handleChange} className="form-control" name="password" type="password" placeholder="Type your password"/>
          </div>
        </div>
        <fieldset>
          <legend>Password Strength</legend>
          <input checked={validatePwd.upperCase} type="checkbox" name="upperCase"/>Password harus memiliki setidaknya satu karakter huruf besar (upper-case)<br/>
          <input checked={validatePwd.lowerCase} type="checkbox" name="upperCase"/>Password harus memiliki setidaknya satu karakter huruf kecil (lower-case)<br/>
          <input checked={validatePwd.specialCase} type="checkbox" name="upperCase"/>Password harus memiliki setidaknya satu karakter spesial (#$@!&%...)<br/>
          <input checked={validatePwd.number} type="checkbox" name="upperCase"/>Password harus memiliki setidaknya satu angka)<br/>
          <input checked={validatePwd.lengthMin} type="checkbox" name="upperCase"/>Password harus memiliki panjang (length) lebih dari 5 karakter<br/>
        </fieldset><br/>
        <button onClick={this.addNewUser} className="btn btn-primary">Add Data</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log('asdfasdfasd1231');
  return {
    formUser: state.user.formUser,
    pwdContaining: state.user.pwdContaining
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addNewUserAPI : (newUser) => dispatch(addNewUserAPI(newUser)),
    validatePassword : (password) => dispatch(
      validatePassword(password)
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserAdd)


// export default UserAdd
