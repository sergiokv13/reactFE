import React from 'react';
import Dashboard from '../Dashboard'
import TechsView from '../techs'
import InventoryView from '../inventory'
import ItemsView from '../items'
import { Route, Redirect, Switch} from 'react-router-dom'

function AuthorizedRoutes(props){
  return (
    <Switch>
      <Route path='/techs' component={TechsView}/>
      <Route path='/items' component={ItemsView}/>
      <Route path='/inventory/:locationId/:truckName' component={InventoryView}/>
      <Route exact path='/inventory' component={InventoryView}/>
      <Route exact path='/' component={Dashboard}/>
      <Redirect from='*' to='/' />
    </Switch>
  )
}

export default AuthorizedRoutes