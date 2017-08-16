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
  FlatButton
} from 'material-ui'
import MdThumbUp from 'react-icons/lib/md/thumb-up'
import MdThumbDown from 'react-icons/lib/md/thumb-down'

class Post extends Component {
  constructor(props) {
    super(props)

    // @TODO fetch comments
    // this.props.fetchComments(this.props.post.id)
  }

  render() {
    const { upVotePost, downVotePost } = this.props
    const { post } = this.props
    return (
      <Card initiallyExpanded={true} className="category-post">
        <CardHeader
          title={<strong>{post.title}</strong>}
          subtitle={`by ${post.author}`}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>{post.body}</CardText>
        <CardActions className="category-post-card-actions">
          <div className="card-actions-left">
            <RaisedButton label="Reply" />
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
    )
  }
}

Post.propTypes = {
  post: PropTypes.shape(models.PostType)
}


function mapPropsToState({}){
  return {}
}

function mapPropsToDispatch(dispatch){
  return {
    upVotePost: (data) => dispatch(actions.upVotePost(data)),
    downVotePost: (data) => dispatch(actions.downVotePost(data)),
    fetchComments: (postId) => dispatch(actions.getPostComments(postId))
  }
}

export default connect(mapPropsToState, mapPropsToDispatch)(Post)