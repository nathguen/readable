// import { RECEIVE_CATEGORIES } from '../actions'
import actions from '../actions'

export default function reducer(state = {}, action) {
  switch (action.type) {
    case actions.RECEIVE_CATEGORIES:
      return action.categories.reduce((obj, category) => {
        if(!obj[category.name]) {
          obj[category.name] = category
        } else {
          obj[category.name] = Object.assign({}, obj[category.name], category)
        }
        // ensures that a voteScore is set
        if(!obj[category.name].voteScore) {
          obj[category.name].voteScore = 0
        }
        return obj
      }, JSON.parse(JSON.stringify(state)))

    case actions.RECEIVE_POSTS:
      const categories = action.posts.reduce((obj, post) => {
        if (!obj[post.category]) {
          obj[post.category] = {
            name: post.category,
            voteScore: post.voteScore
          }
        } else {
          obj[post.category].voteScore += post.voteScore
        }
        return obj
      }, {})
      return Object.assign({}, state, categories)

    case actions.POST_UP_VOTED:
      return {
        ...state,
        [action.category]: {
          ...state[action.category],
          voteScore: state[action.category].voteScore + 1
        }
      }

    case actions.POST_DOWN_VOTED:
      return {
        ...state,
        [action.category]: {
          ...state[action.category],
          voteScore: state[action.category].voteScore - 1
        }
    }

    case actions.RECEIVE_CATEGORY_POSTS:
      return action.posts.reduce((obj, post) => {
        if(!obj[post.category]) {
          obj[post.category] = {
            name: post.category,
            voteScore: post.voteScore
          }
        } else {
          obj[post.category].voteScore += post.voteScore
        }
        return obj
      }, JSON.parse(JSON.stringify(state)))

    case actions.SETUP_NEW_POST:
      return {
        ...state,
        [action.category]: {
          ...state[action.category],
          status: 'creating post'
        }
      }

    case actions.CANCEL_NEW_POST:
      return {
        ...state,
        [action.category]: {
          ...state[action.category],
          status: 'cancelled post'
        }
      }

    case actions.RECEIVE_CREATED_POST:
      return {
        ...state,
        [action.post.category]: {
          ...state[action.post.category],
          status: 'created post'
        }
      }

    default:
      return state
  }
}