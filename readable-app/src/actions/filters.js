export const SET_CATEGORIES_LIST_FILTER = "SET_CATEGORIES_LIST_FILTER"
export const SET_CATEGORY_FILTER = "SET_CATEGORY_FILTER"
export const SET_POST_FILTER = "SET_POST_FILTER"

export function setCategoryListFilter({filter}) {
  return {
    type: SET_CATEGORIES_LIST_FILTER,
    filter
  }
}

export function setCategoryFilter({filter, name}) {
  return {
    type: SET_CATEGORY_FILTER,
    filter,
    name
  }
}

export function setPostFilter({filter, id}) {
  return {
    type: SET_POST_FILTER,
    filter,
    id
  }
}