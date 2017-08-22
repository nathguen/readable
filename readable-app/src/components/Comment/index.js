import React, { Component } from 'react'

class Comment extends Component {
  render() {
    const { comment, lastComment } = this.props

    return (
      <div className="comment-container"> 
        <div className="comment">
          <div className="comment-author">{comment.author}</div>
          <div className="comment-body">{comment.body}</div>
        </div>
        {(!lastComment) && (
          <hr className="comment-separator"/>
        )}
    </div>
    )
  }
}

export default Comment