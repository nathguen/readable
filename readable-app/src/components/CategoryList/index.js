import React, { Component } from 'react'
import Category from '../Category'
import PropTypes from 'prop-types'
import models from '../../models'
import * as sortUtils from '../../utils/sort'

class CategoryList extends Component {
  render(){
    const { categories, posts, listFilter } = this.props

    return (
      <div className="category-list">
        {sortUtils.sortArray(categories, listFilter.filter, listFilter.direction).map(category => {
        return (
          <Category
            key={category.name}
            category={category}
            posts={
              posts.filter(post => post.category === category.name)
            }
            voteScore={category.voteScore} />
          )
        })}
      </div>
    )
  }
}

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  ),
  posts: PropTypes.arrayOf(
    PropTypes.shape(models.PostType)
  ),
  listFilter: PropTypes.shape({
    filter: PropTypes.string,
    direction: PropTypes.bool
  })
}

export default CategoryList