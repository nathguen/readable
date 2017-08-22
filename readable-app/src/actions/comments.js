import guid from 'guid'
import * as api from '../utils/api'

export const CREATE_COMMENT = "CREATE_COMMENT"
export const EDIT_COMMENT = "EDIT_COMMENT"
export const SAVE_COMMENT = "SAVE_COMMENT"
export const DELETE_COMMENT = "DELETE_COMMENT"
export const GET_POST_COMMENTS = "GET_POST_COMMENTS"
export const RECEIVE_POST_COMMENTS = "RECEIVE_POST_COMMENTS"
export const NO_COMMENTS_FOUND = "NO_COMMENTS_FOUND"
export const COMMENT_SUBMITTED = "COMMENT_SUBMITTED"
export const SENDING_COMMENT = "SENDING_COMMENT"



export const getPostCommentsAction = (postId) => {
  return {
    type: GET_POST_COMMENTS,
    postId
  }
}

export const noCommentsFound = (postId) => {
  return {
    type: NO_COMMENTS_FOUND,
    postId
  }
}

export const getPostComments = (postId) => (dispatch) => {
  dispatch(getPostCommentsAction(postId))
  api.fetchPostComments(postId)
    .then((data) => {
      if(data.length) {
        dispatch(receivePostComments({
          comments: data,
          postId
        }))
      } else {
        dispatch(noCommentsFound(postId))
      }
    })
}

export const receivePostComments = ({comments, postId}) => {
  return {
    type: RECEIVE_POST_COMMENTS,
    comments,
    postId
  }
}

export const createCommentAction = (comment) => {
  return {
    type: CREATE_COMMENT,
    comment
  }
}

export const createComment = (comment) => (dispatch) => {
  dispatch(createCommentAction(comment))
  dispatch(submitComment(comment))
}

export const sendingComment = (comment) => {
  return {
    type: SENDING_COMMENT,
    comment
  }
}

export const commentSubmitted = (comment) => {
  return {
    type: COMMENT_SUBMITTED,
    comment
  }
}

export const submitComment = (comment) => (dispatch) => {
  dispatch(sendingComment(comment))
  api.submitComment(comment)
    .then(comment => dispatch(commentSubmitted(comment)))
}