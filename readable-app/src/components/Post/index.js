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
import Moment from 'react-moment'
import MdThumbUp from 'react-icons/lib/md/thumb-up'
import MdThumbDown from 'react-icons/lib/md/thumb-down'
import Comment from '../Comment'
import guid from 'guid'
import './styles.css'
import CommentsContainer from '../CommentsContainer'



class Post extends Component {
  componentDidMount() {
    const { post, fetchComments } = this.props
    if (!post.__comments) {
      fetchComments(post.id)
    }
  }

  initiateComment = (postId) => {
    this.props.initiateComment(postId)
    this.props.selectPost(postId)
  }


  render() {
    const {
      upVotePost,
      downVotePost,
      post,
      toggleComments,
      comments
     } = this.props
    let postComments = []
    let visible = false
    let commentStatus = null

    if (post.__comments) {
      // retrieve comments for post
      postComments = Object.keys(post.__comments).length
        ? Object.keys(post.__comments).reduce((arr, key) => {
          arr.push(comments[key])
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
            title={
              <div className="post-title">
                <span className="post-author">{post.author}</span>
                <strong className="post-title-message">{post.title}</strong>
              </div>
            }
            subtitle={<Moment fromNow>{post.timestamp}</Moment>}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>{post.body}</CardText>
          <CardActions className="category-post-card-actions">
            <div className="card-actions-left">
              <RaisedButton onClick={() => this.initiateComment(post.id)}>
                Reply
              </RaisedButton>
              {(postComments.length > 0) && (
                <span
                  onClick={() => toggleComments(post.id)}
                  className="post-comments-count">
                  {visible
                    ? 'hide '
                    : 'show '}
                  {postComments.length} comments
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
              <span className="vote-score">
                {(post.voteScore > 0) && (
                  <span>+</span>
                )}
                {post.voteScore}
              </span>
            </div>
          </CardActions>
        </Card>
        {(visible) && (
          <CommentsContainer
            comments={postComments}
            post={post}
            commentStatus={commentStatus} />
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
    initiateComment: (postId) => dispatch(actions.initiateComment(postId)),
    selectPost: (postId) => dispatch(actions.selectPost(postId)),
    toggleComments: (postId) => dispatch(actions.toggleCommentsVisibility(postId))
  }
}

export default connect(mapPropsToState, mapPropsToDispatch)(Post)