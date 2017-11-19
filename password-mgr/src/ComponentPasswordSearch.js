import React, { Component } from 'react'
import { connect } from 'react-redux'

class ComponentPasswordSearch extends Component {
  constructor(){
    super()
    this.state={
      searchbox:''
    }
  }

    render(){
      if(this.state.searchbox==''){
      return(
        <div className='container'>
          <div className='row'>

          <form className="navbar-form navbar-center" role="search">
            <div className="form-group">
              <input className="form-control" name="searchbox" placeholder="Search" type="text"/>
            </div>
            <button type="submit" className="btn btn-default">Submit</button>
          </form>

          </div>
          
          <div className='row'>
            <div className='col-md-6 col-md-offset-3'>
              { this.props.password.passwordlist.map((item,idx)=>{
                return(
                  <div className="panel panel-default">
                    <div className="panel-body">
                    <h3>{item.URL}</h3><br/>
                    {item.Username}<br/>
                    {item.Password}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )
    }
    else{
      return(
      <div>
        <h1>hasil cari</h1>
      </div>
    )
    }
    }
}

const mapStateToProps = (state)=>{
  return {
    password : state.Passwordreducer
  }
}

export default connect(mapStateToProps,null)(ComponentPasswordSearch)
