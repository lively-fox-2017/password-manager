import React from 'react'
import { Route } from 'react-router-dom'

import MainComponent from '../components/MainComponent'
import FormContainer from '../containers/FormContainer'
import TableComponent from '../components/TableComponent'

const Routes = (props) => (
  <MainComponent>
    <Route path="/" render={({match}) => (
      <div>
        <FormContainer />
        <TableComponent />
      </div>
    )} />
  </MainComponent>
)

export default Routes
