import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import models from '../../models'
import actions from '../../actions'
import {
  Card,
  CardHeader,
  CardText,
  CardActions,
  RaisedButton,
  FlatButton,
  Paper,
  TextField
} from 'material-ui'
import MdThumbUp from 'react-icons/lib/md/thumb-up'
import MdThumbDown from 'react-icons/lib/md/thumb-down'
import Comment from '../Comment'
import guid from 'guid'
import './styles.css'

class Post extends Component {
  componentDidMount() {
    const { post, fetchComments } = this.props
    if (!post.__comments) {
      fetchComments(post.id)
    }
  }

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
      this.props.createComment(comment)
      this.newCommentTextInput.input.getInputNode().value = ''
    }

  }

  initiateComment = (postId) => {
    this.props.initiateComment(postId)
    this.props.selectPost(postId)
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
      this.props.validComment(postId)
    } else {
      this.props.invalidComment(postId)
    }
  }

  cancelComment = (postId) => {
    this.newCommentTextInput.input.getInputNode().value = ''
    this.props.cancelComment(postId)
  }


  render() {
    const {
      upVotePost,
      downVotePost,
      post,
      showComments,
      deselectPost,
      toggleComments
     } = this.props
    let comments = []
    let visible = false
    let commentStatus = null

    if (post.__comments) {
      // retrieve comments for post
      comments = Object.keys(post.__comments).length
        ? Object.keys(post.__comments).reduce((arr, key) => {
          arr.push(post.__comments[key])
          return arr
        }, [])
        : []

      // retrieve post comments visibility
      visible = post.__comments_visible

      // retrieve comment status
      commentStatus = post.__create_comment_status
    }


    return (
      <div className={
        visible
          ? 'category-post selected-post'
          : 'category-post'}>
        <Card initiallyExpanded={true}>
          <CardHeader
            title={<strong>{post.title}</strong>}
            subtitle={`by ${post.author}`}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>{post.body}</CardText>
          <CardActions className="category-post-card-actions">
            <div className="card-actions-left">
              <RaisedButton onClick={() => this.initiateComment(post.id)}>
                Reply
              </RaisedButton>
              {(comments.length > 0) && (
                <span
                  onClick={() => toggleComments(post.id)}
                  className="post-comments-count">
                    { visible
                    ? 'hide '
                    : 'show '}
                    {comments.length} comments
                  </span>
              )}
            </div>
            <div className="card-actions-right">
              <FlatButton className="vote-button" onClick={() => upVotePost(post)}>
                <MdThumbUp />
              </FlatButton>
              <FlatButton className="vote-button" onClick={() => downVotePost(post)}>
                <MdThumbDown />
              </FlatButton>
              <span className="category-post-vote-score">
                {(post.voteScore > 0) && (
                  <span>+</span>
                )}
                {post.voteScore}
              </span>
            </div>
          </CardActions>
        </Card>
        {(visible) && (
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
                    postId: post.id
                  })}
                  id={`${post.id}-new-comment-text`} />
                <div className="new-comment-buttons-container">
                  <RaisedButton
                    label="Submit"
                    type="submit" />
                  <FlatButton
                    label="Cancel"
                    onClick={() => this.cancelComment(post.id)} />
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
        )}
      </div>
    )
  }
}

Post.propTypes = {
  post: PropTypes.shape(models.PostType)
}


function mapPropsToState({ comments }) {
  return {
    comments
  }
}

function mapPropsToDispatch(dispatch) {
  return {
    upVotePost: (data) => dispatch(actions.upVotePost(data)),
    downVotePost: (data) => dispatch(actions.downVotePost(data)),
    fetchComments: (postId) => dispatch(actions.getPostComments(postId)),
    showComments: (postId) => dispatch(actions.selectPost(postId)),
    createComment: (comment) => dispatch(actions.createComment(comment)),
    initiateComment: (postId) => dispatch(actions.initiateComment(postId)),
    selectPost: (postId) => dispatch(actions.selectPost(postId)),
    validComment: (postId) => dispatch(actions.validComment(postId)),
    invalidComment: (postId) => dispatch(actions.invalidComment(postId)),
    deselectPost: (postId) => dispatch(actions.deselectPost(postId)),
    cancelComment: (postId) => dispatch(actions.cancelComment(postId)),
    toggleComments: (postId) => dispatch(actions.toggleCommentsVisibility(postId))
  }
}

export default connect(mapPropsToState, mapPropsToDispatch)(Post)