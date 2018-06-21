import React from 'react';
import LoginForm from '../authentication/LoginForm'
import { Route, Switch } from 'react-router-dom'

function UnauthorizedRoutes(props){
  return (
    <Switch>
      <Route path='*' exact={true} component={LoginForm} />
    </Switch>
  )
}

export default UnauthorizedRoutes