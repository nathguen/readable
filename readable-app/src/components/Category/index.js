import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import models from '../../models'
import Post from '../Post'
import {
  RaisedButton,
  Paper
} from 'material-ui'
import './styles.css'
import actions from '../../actions'
import { sortArray } from '../../utils/sort'
import NewPost from '../NewPost'
import CategoryToolbar from '../CategoryToolbar'

class Category extends Component {
  filterMap = {
    name: 'title',
    voteScore: 'voteScore'
  }

  render() {
    const { category, posts, dispatch, categoryFilters } = this.props
    const categoryFilter = categoryFilters[category.name] ? categoryFilters[category.name] : {}

    return (
      <div className="category">
        <Paper zDepth={2}>
          <CategoryToolbar 
            category={category}
            filter={categoryFilter} />

          {(category.status === 'creating post') && (
            <NewPost category={category} />
          )}

          { posts.length
          ? sortArray(posts, this.filterMap[categoryFilter.filter], categoryFilter.direction).map(post => (
              <Post key={post.id} post={post} />
            ))
          : (category.status !== 'creating post') && (
            <div className="empty-category-section">
              <p>Looks like this category is empty.</p>
              <RaisedButton label="Create Post" onClick={() => dispatch(actions.setupCreatePost(category.name))} />
            </div>)}
        </Paper>
      </div>
    )
  }
}

Category.propTypes = {
  category: PropTypes.shape(
    models.CategoryType
  ),
  posts: PropTypes.arrayOf(
    PropTypes.shape(models.PostType)
  ),
  voteScore: PropTypes.number.isRequired
}

function mapPropsToState({ filters }) {
  return {
    categoryFilters: filters.category
  }
}

export default connect(mapPropsToState)(Category)