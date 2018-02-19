import React, { Component } from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import Login from "./components/home.component";
import Register from "./components/register.component";
import Shoppinglists from "./components/shoppinglists.component";
import Editshoppinglist from "./components/edit.shoppinglist.component";
import Addshoppinglist from "./components/add.shoppinglist.component";
import Items from "./components/items.component";
import EditItem from "./components/edit.item.component";
import AddItem from "./components/add.item.component";
class App extends Component {
  render() {
    return (
        <Switch id='switch' >
          <Route exact path="/" render={props =><Login {...props}/>}/>
          <Route path="/register"  render={props =><Register {...props}/>}/>
          <Route path="/shoppinglists"  render={props =><Shoppinglists {...props}/>}/>
          <Route  path="/editshoppinglist/:name"  render={props =><Editshoppinglist {...props}/>}/>
          <Route path="/addshoppinglist/"  render={props =><Addshoppinglist {...props}/>}/>
          <Route path="/items/:name"  render={props =><Items {...props}/>}/>
          <Route path="/editItem/:itemshoppinglist/:product/:amount/:quantity"  render={props =><EditItem  {...props}/>}/>
          <Route path="/addItem/:name"  render={props =><AddItem {...props}/>}/>
        </Switch>
    );
  }
}

export default App;
