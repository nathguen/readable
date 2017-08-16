import React, { Component } from 'react'
import {
  TextField,
  Paper,
  RaisedButton
} from 'material-ui'
import { connect } from 'react-redux'
import actions from '../../actions'
import './styles.css'

class NewPost extends Component {
  submitPost = (e) => {
    e.preventDefault()
    const author = this.authorInput.input.value
    const title = this.titleInput.input.value
    const body = this.bodyInput.input.refs.input.value
    this.props.dispatch(actions.createPost({
      post: {
        author, 
        title,
        body
      },
      category: this.props.category.name
    }))
  }

  render() {
    const { category } = this.props

    return (
      <div className="category-new-post-container">
        <Paper zDepth={5} className="category-new-post">
          <form onSubmit={this.submitPost}>
            <h3>New Post
              <span className="new-post-category-name">({category.name})</span>
            </h3>
            <TextField 
              ref={(input) => this.authorInput = input}
              hintText="Author Name" />
            <TextField 
              ref={(input) => this.titleInput = input}
              hintText="Post title" 
              fullWidth={true}/>
            <TextField 
              ref={(input) => this.bodyInput = input}
              hintText="Post body" 
              multiLine={true} 
              fullWidth={true}/>
            <RaisedButton 
              primary={true}
              type="submit" 
              label="Submit" />
            <RaisedButton 
              label="Cancel"
              onClick={() => this.props.dispatch(actions.cancelCreatePost(category.name))} />
          </form>
        </Paper>
      </div>
    )
  }
}

export default connect()(NewPost)