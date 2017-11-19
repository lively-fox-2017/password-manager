import React, { Component } from 'react';
import '../App.css';
import {addUser} from '../actions/index'
import {connect} from 'react-redux'

class Formulir extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inpurl: '',
      inpusername: '',
      inppassword: '',
      checklower: '',
      jumlahmin: false,
      kapital: false,
      karakterunik: false,
      angka: false,
      kecil: false
    }
    this.changeUrl = this.changeUrl.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);

    this.pushtodatabase = this.pushtodatabase.bind(this);
  }

  componentWillMount () {
  }

  changeUrl (event) {
    this.setState({inpurl: event.target.value});
  }

  changeUsername (event) {
    this.setState({inpusername: event.target.value});
  }

  changePassword (event) {
    this.setState({inppassword: event.target.value});
    // var jumlah = new RegExp("^(?=.{5,})")
    // var hurufkapital = new RegExp("^(?=.*[A-Z])")
    // var hurufkecil = new RegExp("^(?=.*[a-z])")
    // var karakterunik = new RegExp("^(?=.*[!@#\$%\^&\*])")
    // var angka = new RegExp("^(?=.*[0-9])")
    // var jumlahTrue = jumlah.test(this.state.inppassword)
    // var hurufTrue = hurufkapital.test(this.state.inppassword)
    // var hurufKecil = hurufkecil.test(this.state.inppassword)
    // var karakterTrue = karakterunik.test(this.state.inppassword)
    // var angkaTrue = angka.test(this.state.inppassword)
    //
    // if (jumlahTrue == true) {
    //   this.setState({jumlahmin: true});
    // }
    // else if (hurufTrue == true) {
    //   this.setState({kapital: true});
    // }
    // else if (hurufKecil == true) {
    //   this.setState({kecil: true});
    // }
    // else if (karakterTrue == true) {
    //   this.setState({karakterunik: true});
    // }
    // else if (angkaTrue == true) {
    //   this.setState({angka: true});
    // }
    // else if (jumlahTrue == false) {
    //   this.setState({jumlahmin: false});
    // }
    // else if (hurufTrue == false) {
    //   this.setState({kapital: false});
    // }
    // else if (karakterTrue == false) {
    //   this.setState({karakterunik: false});
    // }
    // else if (angkaTrue == false) {
    //   this.setState({angka: false});
    // } else {
    //
    // }

    // let objek = {
    //   jumlahmin: this.state.jumlahmin,
    //   kapital: this.state.kapital,
    //   karakterunik: this.state.karakterunik,
    //   angka: this.state.angka
    // }
    // console.log(objek)
  }

  setDefauld (event) {
    this.setState({
      inppassword: '',
      inpusername: '',
      inpurl: ''
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
    var jumlah = new RegExp("^(?=.{5,})")
    var hurufkapital = new RegExp("^(?=.*[A-Z])")
    var hurufkecil = new RegExp("^(?=.*[a-z])")
    var karakterunik = new RegExp("^(?=.*[!@#\$%\^&\*])")
    var angka = new RegExp("^(?=.*[0-9])")

    var jumlahTrue = jumlah.test(this.state.inppassword)
    var hurufTrue = hurufkapital.test(this.state.inppassword)
    var hurufKecil = hurufkecil.test(this.state.inppassword)
    var karakterTrue = karakterunik.test(this.state.inppassword)
    var angkaTrue = angka.test(this.state.inppassword)

    if (jumlahTrue == true) {
      this.setState({jumlahmin: true});
    }
    else if (hurufTrue == true) {
      this.setState({kapital: true});
    }
    else if (hurufKecil == true) {
      this.setState({kecil: true});
    }
    else if (karakterTrue == true) {
      this.setState({karakterunik: true});
    }
    else if (angkaTrue == true) {
      this.setState({angka: true});}

    if (this.state.jumlahmin && this.state.kapital && this.state.karakterunik && this.state.angka && this.state.kecil) {
      let obj = {
        url: this.state.inpurl,
        username: this.state.inpusername,
        password: this.state.inppassword,
        createat: this.tanggal(new Date()),
        editedat: this.tanggal(new Date())
      }
      this.props.addUser(obj)
      this.setDefauld()
      event.preventDefault();
    } else {
      this.setDefauld()
      event.preventDefault();
    }
  }

  check () {

  }

  render() {
    return (
      <div className="App">
      <div className="container">

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
              <input type="submit" value="Submit" />
            </div>
          </div>
        </form>

        <div>
          <div className="col-md-3">

          </div>

          <div className="col-md-6 serach">
          <div>
          <div className="col-md-4">
          {this.state.jumlahmin ? <input type="checkbox" name="vehicle" value="Car" checked disabled/> : <input type="checkbox" name="vehicle" value="Car" disabled/>}
          </div>
          <div className="col-md-6">
          <p>Password harus berjumlah 6 karakter</p>
          </div>
          </div>

          <div>
          <div className="col-md-4">
          {this.state.kapital ? <input type="checkbox" name="vehicle" value="Car" checked disabled/> : <input type="checkbox" name="vehicle" value="Car" disabled/>}
          </div>
          <div className="col-md-8">
          <p>Password harus memiliki huruf kapita minimal 2 karakter</p>
          </div>
          </div>

          <div>
          <div className="col-md-4">
          {this.state.karakterunik ? <input type="checkbox" name="vehicle" value="Car" checked disabled/> : <input type="checkbox" name="vehicle" value="Car" disabled/>}
          </div>
          <div className="col-md-8">
          <p>Password harus memiliki karakter unik minimal 2 karakter</p>
          </div>
          </div>

          <div>
          <div className="col-md-4">
          {this.state.angka ? <input type="checkbox" name="vehicle" value="Car" checked disabled/> : <input type="checkbox" name="vehicle" value="Car" disabled/>}
          </div>
          <div className="col-md-8">
          <p>Password harus memiliki angka minimal 2 karakter</p>
          </div>
          </div>

          <div>
          <div className="col-md-4">
          {this.state.kecil ? <input type="checkbox" name="vehicle" value="Car" checked disabled/> : <input type="checkbox" name="vehicle" value="Car" disabled/>}
          </div>
          <div className="col-md-8">
          <p>Password harus memiliki huruf kecil minimal 2 karakter</p>
          </div>
          </div>

          </div>
        </div>

      </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (obj) => dispatch(addUser(obj)),
  }
}

const formulir = connect(
  mapState,
  mapDispatchToProps
)(Formulir)

export default formulir;
