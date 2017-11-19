import React, {Component} from 'react'
import { Link } from 'react-router-dom'
class Navbar extends Component{
  render(){
    return(
        <nav className="navbar navbar-inverse">
          {/* Brand and toggle get grouped for better mobile display */}
          <div className="navbar-header">
              <button type="button" data-target="#navbarCollapse" data-toggle="collapse" className="navbar-toggle">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
              </button>
              <a href="#" className="navbar-brand">Brand</a>
          </div>
          {/* Collection of nav links, forms, and other content for toggling */}
          <div id="navbarCollapse" className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/users/add">Add User</Link></li>
                  {/* <li><a href="#">Profile</a></li> */}
                  {/* <li className="dropdown">
                      <a data-toggle="dropdown" className="dropdown-toggle" href="#">Messages <b className="caret"></b></a>
                      <ul className="dropdown-menu">
                          <li><a href="#">Inbox</a></li>
                          <li><a href="#">Drafts</a></li>
                          <li><a href="#">Sent Items</a></li>
                          <li className="divider"></li>
                          <li><a href="#">Trash</a></li>
                      </ul>
                  </li> */}
              </ul>
              {/* <form className="navbar-form navbar-left">
                  <div className="input-group">
                      <input type="text" className="form-control" placeholder="Search">
                      <span className="input-group-btn">
                          <button type="button" className="btn btn-default"><span className="glyphicon glyphicon-search"></span></button>
                      </span>
                  </div>
              </form> */}
              {/* <ul className="nav navbar-nav navbar-right">
                  <li><a href="#">Login</a></li>
              </ul> */}
          </div>
      </nav>
    )
  }
}
export default Navbar
