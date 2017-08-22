import actions from '../actions'

export default function reducer(state = {}, action) {
  switch(action.type) {

    case actions.RECEIVE_POST_COMMENTS:
      return Object.assign(state, action.comments.reduce((obj, comment) => {
        obj[comment.id] = comment
        return obj
      }, {}))

    case actions.CREATE_COMMENT:
      return {
        ...state,
        [action.comment.id]: {
          ...action.comment,
          __status: 'created'
        }
      }

    case actions.SUBMITTING_COMMENT:
      return {
        ...state,
        [action.comment.id]: {
          ...action.comment,
          __status: 'submitting'
        }
      }

    case actions.COMMENT_SUBMITTED:
      return {
        ...state,
        [action.comment.id]: {
          ...action.comment,
          __status: 'submitted'
        }
      }

    default:
      return state
  }
}