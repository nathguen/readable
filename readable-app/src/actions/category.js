import * as api from '../utils/api';
import { setCategoryFilter, setCategoryListFilter } from './filters'

export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES"
export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES"
export const RECEIVE_CATEGORY_POSTS = "RECEIVE_CATEGORY_POSTS"



export const receiveCategoryPosts = ({ category, posts }) => ({
  type: RECEIVE_CATEGORY_POSTS,
  category,
  posts
})

export const getCategoryPosts = (category) => dispatch => {
  api.fetchCategoryPosts(category)
    .then(posts => {
      dispatch(receiveCategoryPosts({ category, posts }))
      dispatch(setCategoryFilter({
        filter: 'voteScore',
        name: category.name
      }))
    })
}

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
});

export const getAllCategoriesAction = () => ({
  type: GET_ALL_CATEGORIES
});

export const getAllCategories = () => dispatch => {
  dispatch(getAllCategoriesAction())
  api.getCategories()
    .then(categories => {
      dispatch(receiveCategories(categories))
      // set the intial filters
      dispatch(setCategoryListFilter({ filter: 'voteScore' }))
      categories.map((category) => dispatch(setCategoryFilter({
        filter: 'voteScore',
        name: category.name
      })))
    })
}

