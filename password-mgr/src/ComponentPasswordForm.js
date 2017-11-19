import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios'

class ComponentPasswordForm extends Component {
  constructor(){
    super()
    this.state={
        URL: '',
        Username : '',
        Password:  '',
        CreatedAt : new Date(),
        UpdatedAt : new Date()
    }
  }

  resetState = ()=>{
    console.log('reset');
    this.setState({
      URL: '',
      Username : '',
      Password:  ''
    })
  }

  handleChange = (e) =>{
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  componentWillMount(){
    axios.get("http://localhost:3004/passmgrs")
    .then(({data})=>{
      this.props.password.passwordlist=data
      console.log(  this.props.password.passwordlist);

    })
  }

  onSubmit = (e)=>{
    e.preventDefault()
    const { URL,Username,Password ,CreatedAt,UpdatedAt } = this.state
    axios.post("http://localhost:3004/passmgrs",{ URL,Username,Password ,CreatedAt,UpdatedAt })
    .then(({data})=>{
      console.log('data baru' , data);
      this.props.password.passwordlist.push(data)
      this.resetState()
      console.log(this.props);
    })
  }

  render(){
    const { URL,Username,Password  } = this.state
    return(
      <div className="container">
      <div className="row">

      <form className="form-horizontal" onSubmit={this.onSubmit}>
        <fieldset>
          <legend>Password Form</legend>
          <div className="form-group">
            <label className="col-lg-2 control-label">URL</label>
            <div className="col-lg-10">
              <input className="form-control" id="inputEmail" placeholder="URL" type="text" name="URL" value={URL} onChange={this.handleChange}/>
            </div>
            <label className="col-lg-2 control-label">Username</label>
            <div className="col-lg-10">
              <input className="form-control" id="inputEmail" placeholder="Username" type="text" name="Username" value={Username} onChange={this.handleChange}/>
            </div>
            <label className="col-lg-2 control-label">Password</label>
            <div className="col-lg-10">
              <input className="form-control" id="inputEmail" placeholder="Password" type="password" name="Password" value={Password} onChange={this.handleChange}/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-lg-10 col-lg-offset-2">
              <button type="reset" className="btn btn-default">Cancel</button>
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </div>
        </fieldset>
      </form>
      </div>
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return {
    password : state.Passwordreducer
  }
}

export default connect(mapStateToProps,null)(ComponentPasswordForm)
