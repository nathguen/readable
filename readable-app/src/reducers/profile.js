import actions from '../actions'

export const initialState = {
  userName: null
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case actions.SET_USER_NAME:
      return {
        ...state,
        userName: action.userName
      }
    
    default:
      return state
  }
}