import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'
import passwordValidator from 'password-validator'


export class ComponentPasswordForm extends Component {
  constructor(){
    super()
    this.state={
        URL: '',
        Username : '',
        Password:  '',
        CreatedAt : new Date(),
        UpdatedAt : new Date(),
          oneUpper:false,
          oneLower:false,
          oneSpecial:false,
          oneNumber:false,
          lengthFive:false
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
    const schema = new passwordValidator()
    schema
      .is().min(5)
      .has().uppercase()
      .has().lowercase()
      .has().digits()
      .has().symbols()
    state[e.target.name] = e.target.value
    this.setState(state)
    let passArray =schema.validate(this.state.Password,{list:true})
    console.log(passArray);
    this.setState({passcheck:passArray.length})
    if(passArray.indexOf('min')<0){
      this.setState({lengthFive:true})
    } else { this.setState({lengthFive:false}) }

    if(passArray.indexOf('uppercase')<0){
      this.setState({oneUpper:true})
    } else { this.setState({oneUpper:false}) }

    if(passArray.indexOf('lowercase')<0){
      this.setState({oneLower:true})
    } else { this.setState({oneLower:false}) }

    if(passArray.indexOf('digits')<0){
      this.setState({oneNumber:true})
    }else { this.setState({oneNumber:false}) }

    if(passArray.indexOf('symbols')<0){
      this.setState({oneSpecial:true})
    }else { this.setState({oneSpecial:false}) }
  }

  componentWillMount(){
    // axios.get("http://localhost:3004/passmgrs")
    // .then(({data})=>{
    //   this.props.password.passwordlist=data
    //   // console.log(  this.props.password.passwordlist);
    // })
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
    const { URL,Username,Password,oneUpper,oneLower,oneSpecial,oneNumber,lengthFive  } = this.state
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
            <label className="col-lg-2 control-label ">Password</label>
            <div className="col-lg-10">
              <input className="form-control passwordtext" id="inputEmail" placeholder="Password" type="password" name="Password" value={Password} onChange={this.handleChange}/>
            </div>
          </div>
          <div>
          <div className="checkbox">
            <input type="checkbox" checked={oneUpper}/> Need one Uppercase <br/>
            <input type="checkbox" checked={oneLower}/> Need one Lowercase <br/>
            <input type="checkbox" checked={oneSpecial}/> Need one special character <br/>
            <input type="checkbox" checked={oneNumber}/> Need one number <br/>
            <input type="checkbox" checked={lengthFive}/> Minimum length five character <br/>
          </div>
          </div>
          <div className="form-group">
            <div className="col-lg-10 col-lg-offset-2">
              <button type="reset" className="btn btn-default">Cancel</button>
              <button type="submit" className="btn btn-primary">Save</button>
              <Link to="/search"  className="btn btn-info">Search</Link>
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
