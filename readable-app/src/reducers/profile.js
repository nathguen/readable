import actions from '../actions'
import * as local from '../utils/local-storage'

export const initialState = {
  userName: local.get('userName') ? local.get('userName') : null
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case actions.SET_USER_NAME:
      local.set('userName', action.userName)
      return {
        ...state,
        userName: action.userName
      }
    
    default:
      return state
  }
}