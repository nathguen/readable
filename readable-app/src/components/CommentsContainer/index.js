import React, { Component } from 'react'
import {
  TextField,
  RaisedButton,
  FlatButton
} from 'material-ui'
import guid from 'guid'
import Comment from '../Comment'
import { connect } from 'react-redux'
import actions from '../../actions'
import ReactLoading from 'react-loading'
import './styles.css'


class CommentsContainer extends Component {
  submitComment = (e) => {
    e.preventDefault()
    const body = this.newCommentTextInput.input.getInputNode().value
    if (body.length) {
      const comment = {
        id: guid.raw(),
        body,
        author: "Nathan Guenther",
        parentId: this.props.post.id,
        timestamp: Date.now()
      }
      this.props.dispatch(actions.createComment(comment))
      this.newCommentTextInput.input.getInputNode().value = ''
    }
  }

  setNewCommentClass = (status) => {
    if (status) {
      return `${status} new-comment`
    }
    return "new-comment"
  }

  validateTextInput = ({ value, postId }) => {
    // @TODO add better validation
    if (value.length) {
      this.props.dispatch(actions.validComment(postId))
    } else {
      this.props.dispatch(actions.invalidComment(postId))
    }
  }

  cancelComment = (postId) => {
    this.newCommentTextInput.input.getInputNode().value = ''
    this.props.dispatch(actions.cancelComment(postId))
  }


  render() {
    const { commentStatus, comments, post } = this.props
    const postId = post.id
    const sending = commentStatus === 'sending'

    return (
      <div className="comments-container">
        {(commentStatus && commentStatus !== 'cancelled') && (
          <form
            className={this.setNewCommentClass(commentStatus)}
            onSubmit={(e) => this.submitComment(e)}>
            <TextField
              autoFocus
              className="new-comment-input"
              floatingLabelText="Comment"
              multiLine={true}
              ref={(input) => this.newCommentTextInput = input}
              onChange={() => this.validateTextInput({
                value: this.newCommentTextInput.input.getInputNode().value,
                postId
              })}
              id={`${postId}-new-comment-text`} />
            <div className="new-comment-buttons-container">
              <RaisedButton
                disabled={sending}
                type="submit"
                label={
                  sending
                ? 'Submitting'
                : 'Submit'
                } />
              <FlatButton
                disabled={sending}
                label="Cancel"
                onClick={() => this.cancelComment(postId)} />
              {sending && (
              <ReactLoading 
                type="spin" 
                color="rgba(10, 138, 154, 0.8)" 
                height={40} 
                width={40} 
                delay={0}/>
              )}
            </div>
          </form>
        )}
        {comments.map((comment, index) => (
          <Comment
            key={comment.id}
            comment={comment}
            lastComment={(index === comments.length - 1)} />
        ))}
      </div>
    )
  }
}

export default connect()(CommentsContainer)