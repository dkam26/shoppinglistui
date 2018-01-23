import React, { Component } from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import Auth from "./components/Auth.component";
import Login from "./components/home.component";
import Register from "./components/register.component";
import Shoppinglists from "./components/shoppinglists.component";
import Deleteshoppinglist from "./components/delete.shoppinglist.component";
import Editshoppinglist from "./components/edit.shoppinglist.component";
import Addshoppinglist from "./components/add.shoppinglist.component";
import Items from "./components/items.component";
import EditItem from "./components/edit.item.component";
import DeleteItem from "./components/delete.item.component";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
        <Route exact path="/" render={props =><Login {...props}/>}/>
        <Route exact path="/register"  render={props =><Register {...props}/>}/>
        <Route exact path="/auth"  render={props =><Auth {...props}/>}/>
        <Route exact path="/shoppinglists"  render={props =><Shoppinglists {...props}/>}/>
        <Route exact path="/deleteshoppinglist/:name"  render={props =><Deleteshoppinglist {...props}/>}/>
        <Route exact path="/editshoppinglist/:name"  render={props =><Editshoppinglist {...props}/>}/>
        <Route exact path="/addshoppinglist/"  render={props =><Addshoppinglist {...props}/>}/>
        <Route exact path="/items/:name"  render={props =><Items {...props}/>}/>
        <Route exact path="/editItem/:name"  render={props =><EditItem  {...props}/>}/>
        <Route exact path="/deleteItem/:name"  render={props =><DeleteItem {...props}/>}/>
        </Switch> 
      </div>
    );
  }
}

export default App;
