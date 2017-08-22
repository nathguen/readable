import React, { Component } from 'react'
import {
  Paper,
  TextField,
  RaisedButton,
  Card,
  CardTitle,
  CardText,
  CardActions
} from 'material-ui'
import { connect } from 'react-redux'
import actions from '../../actions'

class LoginPage extends Component {
  submit = (e) => {
    e.preventDefault()
    const userName = this.userNameInput.input.value
    this.props.dispatch(actions.setUserName({userName}))
  }

  render() {
    return (
      <Card zDepth={1}>
        <form onSubmit={(e) => this.submit(e)}>
          <CardTitle>Profile</CardTitle>
          <CardText>
            <TextField
              autoFocus
              ref={(input) => this.userNameInput = input}
              floatingLabelText="Username" />
          </CardText>
          <CardActions>
            <RaisedButton
              label="Enter"
              type="submit" />
          </CardActions>
        </form>
      </Card>
    )
  }
}

export default connect()(LoginPage)