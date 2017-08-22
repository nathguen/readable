import React, { Component } from 'react'
import { connect } from 'react-redux'
import MdThumbUp from 'react-icons/lib/md/thumb-up'
import MdThumbDown from 'react-icons/lib/md/thumb-down'
import {
  FlatButton
} from 'material-ui'
import actions from '../../actions'
import Moment from 'react-moment'
import './styles.css'

class Comment extends Component {
  render() {
    const { comment, lastComment, dispatch } = this.props

    return (
      <div className="comment-container">
        <div className="comment">
          <div className="comment-content">
            <div className="comment-title">
              <span className="comment-author">{comment.author}</span>
              <span className="comment-body">{comment.body}</span>
            </div>
            <div className="comment-time"><Moment fromNow>{comment.timestamp}</Moment></div>
          </div>
          <div className="comment-actions">
            <FlatButton className="vote-button" onClick={() => dispatch(actions.upVoteComment(comment))}>
              <MdThumbUp />
            </FlatButton>
            <FlatButton className="vote-button" onClick={() => dispatch(actions.downVoteComment(comment))}>
              <MdThumbDown />
            </FlatButton>
            <span className="vote-score">
            {(comment.voteScore > 0) && (
              <span>+</span>
            )}
            {comment.voteScore}
          </span>
          </div>
        </div>
        {(!lastComment) && (
          <hr className="comment-separator" />
        )}
      </div>
    )
  }
}

export default connect()(Comment)