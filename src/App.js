import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import './App.css';
import Dashboard from './components/Dashboard';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login }></Route>
          <Route exact path="/dashboard" component={ Dashboard }></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
