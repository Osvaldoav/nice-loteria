import React from 'react';
import {Route, Switch} from "react-router-dom";
import Home from './containers/Home';
import Admin from './containers/Admin';
import User from './containers/User';

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/admin" exact component={Admin}/>
      <Route path="/users/:userID" component={User}/>
    </Switch>
  )
}

export default Routes;