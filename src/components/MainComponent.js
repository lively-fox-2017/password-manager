import React from 'react'

import HeaderComponent from './HeaderComponent'
import '../assets/index.css'
import '../assets/bootstrap.min.css'

const MainComponent = (props) => (
  <div>
    <div className="App container-fluid">
      <HeaderComponent />
    </div>
    <div className="container-fluid">
      {props.children}
    </div>
  </div>
)

export default MainComponent
