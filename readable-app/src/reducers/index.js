import { combineReducers } from 'redux'
import posts from './post'
import categories from './category'
import filters from './filters'
import comments from './comments'

export default combineReducers({
    posts,
    categories,
    filters,
    comments
})