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

    case actions.GET_POST_COMMENTS:
      return {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          __comments_status: 'getting comments',
          __comments_visible: false
        }
      }

    case actions.RECEIVE_POST_COMMENTS:
      return {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          __comments: action.comments.reduce((obj, comment) => {
            obj[comment.id] = comment.id
            return obj
          }, {}),
          __comments_status: `found ${action.comments.length} comments`
        }
      }
      
    case actions.NO_COMMENTS_FOUND:
      return {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          __comments: {},
          __comments_status: 'no comments found'
        }
      }

    case actions.SELECT_POST:
      return {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          __comments_visible: true
        }
      }

    case actions.DESELECT_POST:
      return {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          __comments_visible: false
        }
      }

    case actions.DESELECT_POSTS:
      return Object.assign({}, Object.keys(state).reduce((obj, key) => {
        obj[key] = Object.assign({}, obj[key], {
          __comments_visible: false
        })
        return obj
      }, state))

    case actions.SENDING_COMMENT:
      return {
        ...state,
        [action.comment.parentId]: {
          ...state[action.comment.parentId],
          __create_comment_status: 'sending'
        }
      }

    case actions.COMMENT_SUBMITTED:
      return {
        ...state,
        [action.comment.parentId]: {
          ...state[action.comment.parentId],
          __create_comment_status: 'submitted',
          __comments: {
            ...state[action.comment.parentId].__comments,
            [action.comment.id]: action.comment.id
          }
        }
      }

    case actions.INITIATE_COMMENT:
      return {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          __create_comment_status: 'initiated'
        }
      }

    case actions.VALID_COMMENT:
      return {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          __create_comment_status: 'valid'
        }
      }

    case actions.INVALID_COMMENT:
      return {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          __create_comment_status: 'invalid'
        }
      }

    case actions.CANCEL_COMMENT:
      return {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          __create_comment_status: 'cancelled'
        }
      }

    case actions.TOGGLE_COMMENTS_VISIBILITY:
      return {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          __comments_visible: !state[action.postId].__comments_visible
        }
      }

    default:
      return state
  }
}