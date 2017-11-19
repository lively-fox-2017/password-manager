import React from 'react'
import { Route } from 'react-router-dom'

import MainComponent from '../components/MainComponent'
import FormContainer from '../containers/FormContainer'

const Routes = (props) => (
  <div>
    <Route path="/" render={({match}) => (
      <MainComponent>
        <FormContainer />
      </MainComponent>
    )} />
  </div>
)

export default Routes
