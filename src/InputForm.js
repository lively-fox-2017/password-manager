import React from 'react'
import { connect } from 'react-redux'
import Chance from 'chance'

import { inputAccount } from './actions/managerAction'
import trueImg from './images/true.png'
import falseImg from './images/false.png'

const chance = new Chance()

class InputForm extends React.Component {
  constructor() {
    super()
    this.state = {
      account: {
        id: chance.guid(),
        url: '',
        username: '',
        password: '',
        createdAt: new Date(),
        updatedAt: ''
      },
      errors: []
    }
  }

  handleInput = (e) => {
    let state = this.state.account
    state[e.target.name] = e.target.value

    this.setState(state)

    this.setState({
       errors: [
         {
           status: false,
           text: 'Password should contain atleast 1 Uppercase character'
         },
         {
           status: false,
           text: 'Password should contain atleast 1 Lowercase character'
         },
         {
           status: false,
           text: 'Password should contain atleast 1 Special Character (#$@!&%^*-+?)'
         },
         {
           status: false,
           text: 'Password should contain atleast 1 Number'
         },
         {
           status: false,
           text: 'Password length should more that 5 character'
         }
       ]
     })
    // Cara Biasa
    // const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    // const lowerCase = "abcdefghijklmnopqrstuvwxyz"
    // const specialChar = "#$@!&%^*-+"
    // const number = "1234567890"

    // Cara Regex
    const upperCase = /[A-Z]/
    const lowerCase = /[a-z]/
    const specialChar = /[#$@!&%^*-+)]/
    const number = /\d/
    const passwordAuth = this.state.account.password.split("")

    if (passwordAuth.length >= 5) {
      this.setState(function(state) {
        state.errors[4].status = true
      })
    }

    passwordAuth.map((chr) => {
      // Kondisi Cara Biasa
      // if (upperCase.indexOf(chr) !== -1) {
      //   return (
      //     this.setState(function(state) {
      //       state.errors[0].status = true
      //     })
      //   )
      // } else if (lowerCase.indexOf(chr) !== -1) {
      //   return (
      //     this.setState(function(state) {
      //       state.errors[1].status = true
      //     })
      //   )
      // } else if (specialChar.indexOf(chr) !== -1) {
      //   return (
      //     this.setState(function(state) {
      //       state.errors[2].status = true
      //     })
      //   )
      // } else if (number.indexOf(chr) !== -1) {
      //   return (
      //     this.setState(function(state) {
      //       state.errors[3].status = true
      //     })
      //   )
      // }

      // Kondisi Cara Regex
      if (upperCase.test(chr)) {
        return (
          this.setState(function(state) {
            state.errors[0].status = true
          })
        )
      } else if (lowerCase.test(chr)) {
        return (
          this.setState(function(state) {
            state.errors[1].status = true
          })
        )
      } else if (specialChar.test(chr)) {
        return (
          this.setState(function(state) {
            state.errors[2].status = true
          })
        )
      } else if (number.test(chr)) {
        return (
          this.setState(function(state) {
            state.errors[3].status = true
          })
        )
      }

      return chr
    })
  }

  handleInputAccount = (e) => {
    e.preventDefault()

    // let idx = this.state.errors.findIndex((error) => {
    //   return !error.status
    // })
    // console.log(this.state.account);

    // if (idx !== -1) {
    //   alert("Sorry your password still not Strong Enough")
    // } else {
    //   this.props.accountInput(this.state.account)
    // }

    this.props.accountInput(this.state.account)

    this.setState({
      account: {
        id: chance.guid(),
        url: '',
        username: '',
        password: '',
        createdAt: new Date(),
        updatedAt: ''
      },
      errors: []
    })
  }

  render() {
    const { url, username, password } = this.state.account
    return (
      <form onSubmit={ this.handleInputAccount }>
        <h3>Input Form</h3><br />
        <div className="form-group has-success">
          <label className="control-label" htmlFor="inputSuccess">URL</label>
          <input className="form-control text-center" id="inputSuccess" name="url" type="text" value={ url } onChange={ this.handleInput } required />
        </div>
        <div className="form-group has-success">
          <label className="control-label" htmlFor="inputSuccess">Username</label>
          <input className="form-control text-center" id="inputSuccess" name="username" type="text" value={ username } onChange={ this.handleInput } required />
        </div>
        <div className="form-group has-success">
          <label className="control-label" htmlFor="inputSuccess">Password</label>
          <input className="form-control text-center" id="inputSuccess" name="password" type="password" value={ password } onChange={ this.handleInput } required />
          <h6>Password Strength :</h6>
          <table className="col-md-offset-5" style={{"marginBottom": 20+"px"}}>
            <tbody>
            { this.state.errors.map((error, index) => {
              return (
                <tr key={index}>
                  {error.status ?
                  <td style={{"paddingRight": 10+"px"}}><img src={ trueImg } alt='' width="25px" /></td> :
                  <td style={{"paddingRight": 10+"px"}}><img src={ falseImg } alt='' width="25px" /></td>
                  }
                  <td className = "text-left">{ error.text }</td>
                </tr>
              )
            }) }
            </tbody>
          </table>
        </div>
        <div className="form-group">
          <div className="col-md-12 text-center">
            <button type="reset" className="btn btn-default">Cancel</button>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </div>
      </form>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
    accountInput: (dataAccount) => dispatch(inputAccount(dataAccount))
})

export default connect(null, mapDispatchToProps)(InputForm)
