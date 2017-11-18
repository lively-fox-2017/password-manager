import React from 'react'

import searchIcon from './images/search.png'

function search () {
  return (
    <div className="form-group">
      <div className="input-group">
        <span className="input-group-addon"><img src={searchIcon} alt="search icon" style={{"width": 25+"px"}} /></span>
        <input className="form-control" type="text" />
        <span className="input-group-btn">
          <button className="btn btn-default" type="button">Search</button>
        </span>
      </div>
    </div>
  )
}

export default search
