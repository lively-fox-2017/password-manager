import React from 'react'
import { Route } from 'react-router-dom'

import MainComponent from '../components/MainComponent'
import FormContainer from '../containers/FormContainer'
import TableContainer from '../containers/TableContainer'

const Routes = (props) => (
  <MainComponent>
    <Route path="/" render={({match}) => (
      <div>
        <FormContainer />
        <TableContainer />
      </div>
    )} />
  </MainComponent>
)

export default Routes
