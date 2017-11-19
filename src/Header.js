import React from 'react'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand">Password Management</a>
          </div>
          <ul className="nav navbar-nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/add_user">ADD User</Link></li>
          </ul>
        </div>
      </nav>        
    </header>
  )
}
export default Header