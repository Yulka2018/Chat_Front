import React, { Component } from 'react';
import './App.css';
import MainPage from './MainPage';
import ChatRooms from './ChatRooms';
import HomePage from './HomePage.js'
import {Provider} from 'react-redux';
import {store, ConnectedLogin} from './reducers.js';

import {Switch, Router, Route} from 'react-router-dom';
import createHistory from "history/createBrowserHistory"; 

class App extends Component {
  render() {
    return (
      <Provider store = {store}>  
        <Router history = {createHistory()}>
          <div>
              <Switch>
                  <Route path="/" component = {MainPage} exact/>
                  <Route path="/chatrooms" component = {ChatRooms}/>
                  <Route path = "/LogIn" component = {ConnectedLogin} />
                  <Route path = "/home/:nick" component = {HomePage} />
              </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}


export default App;


