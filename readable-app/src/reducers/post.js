import actions from '../actions'

export default function reducer(state = {}, action) {
  switch (action.type) {
    case actions.GET_ALL_POSTS:
      return {
        ...state
      }

    case actions.RECEIVE_POSTS:
      return Object.assign({}, state, action.posts.reduce((obj, post) => {
        obj[post.id] = post
        return obj
      }, {}))

    case actions.RECEIVE_CATEGORY_POSTS:
      return Object.assign({}, state, action.posts.reduce((obj, post) => {
        obj[post.id] = post
        return obj
      }, {}))

    case actions.POST_UP_VOTED:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          voteScore: action.voteScore
        }
      }

    case actions.POST_DOWN_VOTED:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          voteScore: action.voteScore
        }
      }

    case actions.RECEIVE_CREATED_POST:
      return {
        ...state,
        [action.post.id]: action.post
      }

    case actions.RECEIVE_POST_COMMENTS:
      return {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          comments: action.comments.reduce((arr, comment) => {
            arr.push(comment.id)
            return arr
          }, [])
        }
      }
      
    default:
      return state
  }
}