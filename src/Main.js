import React from 'react'
import { Route } from 'react-router-dom'
import Home from './components/Home'
import FormUser from './components/FormUser'
const Main = () => {
  return (
    <div>
      <Route exact path='/' component={Home}/>
      <Route path='/add_user' component={FormUser}/>
    </div>
  )
}
export default Main