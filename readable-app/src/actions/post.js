import * as api from '../utils/api'
import guid from 'guid'

export const GET_ALL_POSTS = "GET_ALL_POSTS"
export const RECEIVE_POSTS = "RECEIVE_POSTS"
export const UP_VOTE_POST = "UP_VOTE_POST"
export const DOWN_VOTE_POST = "DOWN_VOTE_POST"
export const RECEIVE_UPDATED_POST = "RECEIVE_UPDATED_POST"
export const POST_UP_VOTED = "POST_UP_VOTED"
export const POST_DOWN_VOTED = "POST_DOWN_VOTED"
export const RECEIVE_CREATED_POST = "RECEIVE_CREATED_POST"
export const TRY_CREATE_POST = "TRY_CREATE_POST"
export const SETUP_NEW_POST = "SETUP_NEW_POST"
export const CANCEL_NEW_POST = "CANCEL_NEW_POST"

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
});

export const getAllPostsAction = () => ({
  type: GET_ALL_POSTS
});

export const getAllPosts = () => dispatch => {
  dispatch(getAllPostsAction())
  api.getPosts()
    .then(posts => dispatch(receivePosts(posts)))
}

export const postUpVoted = (post) => {
  return {
    type: POST_UP_VOTED,
    id: post.id,
    voteScore: post.voteScore,
    category: post.category
  }
}

export const postDownVoted = (post) => {
  return {
    type: POST_DOWN_VOTED,
    id: post.id,
    voteScore: post.voteScore,
    category: post.category
  }
}

export const upVotePost = (initialPost) => dispatch => {
  const proposedPost = Object.assign({}, initialPost, {
    voteScore: initialPost.voteScore + 1
  })

  api.updatePost(proposedPost)
    .then(returnedPost => dispatch(postUpVoted(returnedPost)))
}

export const downVotePost = (initialPost) => dispatch => {
  const proposedPost = Object.assign({}, initialPost, {
    voteScore: initialPost.voteScore - 1
  })

  api.updatePost(proposedPost)
    .then(returnedPost => dispatch(postDownVoted(returnedPost)))
}

export const createPost = ({post, category}) => dispatch => {
  const proposedPost = Object.assign({}, post, {
    category
  })
  dispatch(tryCreatePost(proposedPost))
  api.createPost(proposedPost)
    .then(returnedPost => {
      dispatch(receiveCreatedPost(returnedPost))
    })
}

export const receiveCreatedPost = (post) => {
  return {
    type: RECEIVE_CREATED_POST,
    post
  }
}

export const tryCreatePost = (post) => {
  return {
    type: TRY_CREATE_POST,
    post
  }
}

export const setupCreatePost = (category) => {
  return {
    type: SETUP_NEW_POST,
    category
  }
}

export const cancelCreatePost = (category) => {
  return {
    type: CANCEL_NEW_POST,
    category
  }
}