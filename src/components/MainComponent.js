import React from 'react'

import logo from '../logo.svg'
import '../assets/App.css'
import '../assets/bootstrap.min.css'

const MainComponent = (props) => (
  <div>
    <div className="App container-fluid">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
    </div>
    <div className="container-fluid">
      {props.children}
    </div>
  </div>
)

export default MainComponent
