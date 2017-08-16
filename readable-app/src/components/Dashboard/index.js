import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import CategoryPage from '../CategoryPage'
import HomePage from '../HomePage'
import './styles.css'

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <Router>
          <div>
            <Route exact path="/category/:category" component={CategoryPage} />
            <Route exact path="/" component={HomePage} />
          </div>
        </Router>
      </div>
    );
  }
}

export default Dashboard