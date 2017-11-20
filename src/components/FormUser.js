
import React from 'react'
import { connect } from 'react-redux'
import User from '../reducers/UserReduce'
import { addUserAPI, updateUserAPI } from '../actions/UserAction'

class FormUser extends React.Component {
  constructor (props) {
      super(props)
      this.state = {}
      console.log(props)
  }
  onChange(key, e) {
    this.props.inputUser[key] = e.target.value
    this.setState(this.props.inputUser)
  } 
  render () {
    this.button = 'Save'        
    if(this.props.btn_update) {
      this.button = 'Update'        
    }   
    return (
        <div className="form-wrp">
          <h2>User Registration </h2>
          <form className="form form-horizontal" onSubmit={e => { 
            e.preventDefault() 
            if(!this.props.btn_update) {
              this.props.saveUser(this.props.inputUser)
            }else{
              this.props.updateUser(this.props.id, this.props.inputUser)              
            }
            }}>
          <div className="form-group">
            <label className="control-label col-sm-3" for="url">Your URL</label>
            <div className="col-sm-9">
              <input type="text" onChange={this.onChange.bind(this, "url")} className="form-control" placeholder="URL..." id="url" value={this.props.inputUser.url}/>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-3" for="username">Username ID</label>
            <div className="col-sm-9">
            <input type="text" onChange={this.onChange.bind(this, "username")} className="form-control" placeholder="Username..." id="username" value={this.props.inputUser.username}/>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-3" for="password">Password</label>
            <div className="col-sm-9">
            <input type="text" onChange={this.onChange.bind(this, "password")} className="form-control" placeholder="Password..." id="password" value={this.props.inputUser.password} />
            </div>
          </div>
          <div className="form-group"> 
            <div className="col-sm-offset-0 col-sm-12">
              <button type="submit" className="btn btn-primary">{this.button}</button>
              {/* <button type="button" className="btn btn-primary" onClick={this.clearForm()}>Cancel</button> */}
            </div>
          </div>          
          </form>
        </div>
      )
  }
}
const mapDispatch = (dispatch) => {
  return { 
    saveUser: (input) => dispatch(addUserAPI(input)), 
    updateUser:(id, input) => dispatch(updateUserAPI(id, input))    
  }
} 
const mapState = (state) => {
  return { inputUser: state.UserReduce.inputUser, id: state.UserReduce.id, btn_update: state.UserReduce.btn_update }
}
const userConnect = connect(mapState, mapDispatch)(FormUser)
export default userConnect