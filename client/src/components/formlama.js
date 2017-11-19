import React, { Component } from 'react';
import '../App.css';
import {editUser, getUserSatuan} from '../actions/index'
import {connect} from 'react-redux'
// import { browserHistory } from 'react-router';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class Formulirbaru extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inpid: this.props.usersatuan.id,
      inpurl: this.props.usersatuan.url,
      inpusername: this.props.usersatuan.username,
      inppassword: this.props.usersatuan.password,
      inpcreateat: this.props.usersatuan.createat,
      inpeditedat: ''
    }
    this.changeUrl = this.changeUrl.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);

    this.pushtodatabase = this.pushtodatabase.bind(this);
  }

  componentWillMount (props) {
    let params = window.location.pathname.split('/')
    let paramsId = params[1]
    this.props.getUserSatuan(paramsId)

  }

  componentDidMount () {
  }

  changeUrl (event) {
    this.setState({inpurl: event.target.value});
  }

  changeUsername (event) {
    this.setState({inpusername: event.target.value});
  }

  changePassword (event) {
    this.setState({inppassword: event.target.value});
  }

  setDefault (event) {
    this.setState({
      inpid: '',
      inpurl: '',
      inpusername: '',
      inppassword: '',
      inpcreateat: '',
      inpeditedat: ''
    });
  }

  tanggal (date) {
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes()

    return day + ' ' + monthNames[monthIndex] + ' ' + year + ' ' + ' | ' +hours + ':' + minutes;
  }


  pushtodatabase (event) {
    console.log('amankan kawan')
    // this.props.history.push("/someNewPage");
    let obj = {
      id: this.state.inpid,
      url: this.state.inpurl,
      username: this.state.inpusername,
      password: this.state.inppassword,
      createat: this.state.inpcreateat,
      editedat: this.tanggal(new Date())
    }
    this.props.editUser(obj)
    this.setDefault()
    event.preventDefault();
  }

  render() {
    return (

      <div className="App">
      <div className="container">

      <p>Udin</p>

        <form className="form-horizontal" onSubmit={this.pushtodatabase}>
          <div className="form-group">
            <label htmlFor="inpurl" className="col-sm-2 control-label">Input Url</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inpurl" value={this.state.inpurl} onChange={this.changeUrl}></input>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inpusername" className="col-sm-2 control-label">Username</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inpusername" value={this.state.inpusername} onChange={this.changeUsername}></input>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inppassword" className="col-sm-2 control-label">Password</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inppassword"  value={this.state.inppassword} onChange={this.changePassword}></input>
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" onClick={this.pushtodatabase} name="button"><Link to={'/'}>Apply</Link></button>
            </div>
          </div>
        </form>


      </div>
      </div>

    );
  }
}

// <input type="submit" value="Submit" />

const mapState = state => {
  return {
    usersatuan: state.usersuccessget.usersatuan,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editUser: (obj) => dispatch(editUser(obj)),
    getUserSatuan: (id) => dispatch(getUserSatuan(id))
  }
}

const formulirbaru = connect(
  mapState,
  mapDispatchToProps,
)(Formulirbaru)

export default formulirbaru;
