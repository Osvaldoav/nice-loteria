import React from 'react';
import {Route, Switch} from "react-router-dom";
import Home from './containers/Home';
import Admin from './containers/Admin';
import User from './containers/User';
import SignIn from './containers/SignIn';

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/signin" exact component={SignIn}/>
      <Route path="/users/:userID" component={User}/>
      <Route path="/admin" exact component={Admin}/>
    </Switch>
  )
}

export default Routes;