import React, { Component } from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import Auth from "./components/Auth.component";
import Login from "./components/home.component";
import Register from "./components/register.component";
import Shoppinglists from "./components/shoppinglists.component";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
        <Route exact path="/login" render={props =><Login {...props}/>}/>
        <Route exact path="/register"  render={props =><Register {...props}/>}/>
        <Route exact path="/auth"  render={props =><Auth {...props}/>}/>
        <Route exact path="/shoppinglists"  render={props =><Shoppinglists {...props}/>}/>
        </Switch> 
      </div>
    );
  }
}

export default App;
