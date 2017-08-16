import actions from '../actions'

export default function reducer(state = {}, action) {
  switch(action.type) {
    case actions.RECEIVE_POST_COMMENTS:
      return Object.assign({}, state, action.comments.reduce((obj, comment) => {
        obj[comment.id] = comment
        return obj
      }, {}))

    default:
      return state
  }
}