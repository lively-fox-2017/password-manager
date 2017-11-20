import React, { Component } from 'react'
import { connect } from 'react-redux'
import { putUserAPI, fetchUserByIdAPI, changeValueForm, validatePassword } from '../actions/user'
// import { Redirect } from 'react-router'
import owasp from 'owasp-password-strength-test'

owasp.config({
  allowPassphrases       : true,
  maxLength              : 128,
  minLength              : 5,
  minPhraseLength        : 20,
  minOptionalTestsToPass : 1,
})

class UserEdit extends Component {
  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.editUser = this.editUser.bind(this)
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
    let state = this.props.formUser
    state[e.target.name] = e.target.value
    this.setState(state)
    if (e.target.name==='password') {
      this.cekPass(e.target.value)
    }
    e.preventDefault();
  }
  componentWillMount(){
    // console.log('cek id', this.props.match.params.id);
    this.props.fetchUserById(this.props.match.params.id);
    // this.cekPass(this.props)
    // console.log('asdfasd', this.props);
  }
  editUser(e){
    let newFormUser = this.props.formUser
    newFormUser.updatedAt = new Date()
    // console.log(newFromUser);
    if (owasp.test(newFormUser.password).errors.length === 0) {
      this.props.putUser(newFormUser.id, newFormUser)
    } else {
      alert('Your password not strong!')
    }
    e.preventDefault();
  }
  render(){
    let formUser=this.props.formUser
    let validatePwd = this.props.pwdContaining
    return(
      <div className="container">
        <h1 align="center">Edit Data User</h1>
        <div className="form" style={{width: 300}}>
          <div className="form-group">
            <label>URL</label>
            <input onChange={this.handleChange} value={formUser.url} className="form-control" name="url" type="text" placeholder="Type your URL"/>
          </div>
          <div className="form-group">
            <label>Username</label>
            <input onChange={this.handleChange} value={formUser.username} className="form-control" name="username" type="text" placeholder="Type your username"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input onChange={this.handleChange} value={formUser.password} className="form-control" name="password" type="password" placeholder="Type your password"/>
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
        <button onClick={() => this.editUser()} className="btn btn-primary">Edit Data</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    formUser: state.user.formUser,
    pwdContaining: state.user.pwdContaining
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserById : (id) => dispatch(fetchUserByIdAPI(id)),
    putUser : (id, formUser) => dispatch(putUserAPI(id, formUser)),
    changeValueForm : (formUser) => dispatch(changeValueForm(formUser)),
    validatePassword : (password) => dispatch(
      validatePassword(password)
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserEdit)


// export default UserAdd
