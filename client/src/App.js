import React, { Component } from 'react';
import './App.css';
import {addUser, getUser, hapususer, getUserSatuan, knop} from './actions/index'
import {connect} from 'react-redux'
import Formulir from './components/formbaru'
import Formulirlama from './components/formlama'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
// import { withRouter } from 'react-router';
// import { browserHistory } from 'react-router';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount () {
    this.props.getUser()
  }

  hapus (id) {
    // console.log('makan');
    this.props.hapususer(id)
  }

  edited (id) {
    this.props.getUserSatuan(id)
  }

  myFunction () {
    var input, filter, table, tr, td, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  render() {
    return (
      <Router>
      <div className="App">
      <div className="container">

      <Route exact path="/" render={(props) => ( <Formulir/> )}/>
      <Route exact path="/:id" render={(props) => ( <Formulirlama/> )}/>

      <div>
      <div className="col-md-3">
      </div>
      <div className="col-md-6">
      <input className="form-control serach" type="text" id="myInput" onKeyUp={this.myFunction} placeholder="Search for username.."/>
      </div>
      </div>


      <div className="jarak">


        <table className="table table-hover" id="myTable">
        <thead>
          <tr>
          <th>Url</th>
          <th>Username</th>
          <th>Password</th>
          <th>Tanggal Daftar</th>
          <th>tanggal Edit</th>
          <th>Edit</th>
          <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {this.props.usersuccessget.map((data, index)=> {
            return(
              <tr>
              <td><a href={data.url}>{data.url}</a></td>
              <td>{data.username}</td>
              <td>{data.password}</td>
              <td>{data.createat}</td>
              <td>{data.editedat}</td>
              <td><Link to={'/' + data.id}><p onClick={()=> this.edited(data.id)}>Edit</p></Link></td>
              <td><a href="#"><p onClick={()=> this.hapus(data.id)}>Delete</p></a></td>
              </tr>
            )
          })}
        </tbody>
        </table>

        </div>

      </div>
      </div>
      </Router>
    );
  }
}

const mapState = state => {
  return {
    usersuccessget: state.usersuccessget.usersuccessget
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch(getUser()),
    hapususer: (id) => dispatch(hapususer(id)),
    getUserSatuan: (id) => dispatch(getUserSatuan(id))
  }
}

const app = connect(
  mapState,
  mapDispatchToProps
)(App)

export default app;
