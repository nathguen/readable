import actions from '../actions'

// direction true is ascending
// direction false is descending

const initialState = {
  categoriesList: {},
  category: {},
  post: {}
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case actions.SET_CATEGORIES_LIST_FILTER:
      // if the same filter has been activated again, alternate the direction of the sort
      if(state.categoriesList.filter === action.filter) {
        return {
          ...state,
          categoriesList: {
            ...state.categoriesList,
            direction: !state.categoriesList.direction
          }
        }
      }
      return {
        ...state,
        categoriesList: {
          filter: action.filter,
          direction: false
        }
      }

    case actions.SET_CATEGORY_FILTER:
      if(  state.category[action.name] 
        && state.category[action.name].filter === action.filter) {
        return {
          ...state,
          category: {
            ...state.category,
            [action.name]: {
              filter: action.filter,
              direction: !state.category[action.name].direction
            }
          }
        }
      } else {
        return {
          ...state,
          category: {
            ...state.category,
            [action.name]: {
              filter: action.filter,
              direction: false
            }
          }
        }
      }

    default:
      return state
  }
}