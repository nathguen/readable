import * as api from '../utils/api'

export const CREATE_COMMENT = "CREATE_COMMENT"
export const EDIT_COMMENT = "EDIT_COMMENT"
export const SAVE_COMMENT = "SAVE_COMMENT"
export const DELETE_COMMENT = "DELETE_COMMENT"
export const GET_POST_COMMENTS = "GET_POST_COMMENTS"
export const RECEIVE_POST_COMMENTS = "RECEIVE_POST_COMMENTS"

export const createCommentAction = ({comment, postId}) => {
  return {
    type: CREATE_COMMENT,
    comment,
    postId
  }
}

export const createComment = ({comment, postId}) => (dispatch) => {
  api.createComment()
}

export const getPostCommentsAction = (postId) => {
  return {
    type: GET_POST_COMMENTS,
    postId
  }
}

export const getPostComments = (postId) => (dispatch) => {
  dispatch(getPostCommentsAction(postId))
  api.fetchPostComments(postId)
    .then((resp) => dispatch(receivePostComments({
      comments: resp,
      postId
    })))
}

export const receivePostComments = ({comments, postId}) => {
  return {
    type: RECEIVE_POST_COMMENTS,
    comments,
    postId
  }
}