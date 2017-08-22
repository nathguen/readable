import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'
import CategoryPage from '../CategoryPage'
import HomePage from '../HomePage'
import LoginPage from '../LoginPage'
import { connect } from 'react-redux'
import './styles.css'

class Dashboard extends Component {
  render() {
    const { userName } = this.props
    const loggedIn = !!userName

    return (
      <div className="dashboard">
        <Router>
          <div>
            { !loggedIn && (<Redirect to="/login" />)}

            <Route exact path="/" component={HomePage} />
            <Route exact path="/category/:category" component={CategoryPage} />
            <Route exact path="/login" render={() => (
              loggedIn ? (
                <Redirect to="/" />
              ) : (
                <LoginPage />
              )
            )} />
          </div>
        </Router>
      </div>
    );
  }
}

function mapPropsToState({ profile }) {
  return {
    userName: profile.userName
  }
}

export default connect(mapPropsToState)(Dashboard)