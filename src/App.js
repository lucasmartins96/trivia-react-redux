import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Feedback from './pages/Feedback';
import GamePage from './pages/GamePage';
import Login from './pages/Login';
import Settings from './pages/Settings';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/setting" component={ Settings } />
          <Route exact path="/game" component={ GamePage } />
          <Route exact path="/feedback" component={ Feedback } />
        </Switch>
      </header>
    </div>
  );
}
