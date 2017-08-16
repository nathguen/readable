import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import Category from '../Category'

class CategoryPage extends Component {
  constructor(props) {
    super(props)
    const category = this.props.match.params.category
    this.props.getCategoryPosts({
      name: category,
      path: category
    })
  }

  render() {
    const { categories } = this.props
    if( Object.keys(categories).length === 0
    ||  !categories[this.props.match.params.category]) {
      return null
    }

    const category = categories[this.props.match.params.category]
    const posts = this.props.posts.filter(post => post.category === category.name)
    return (
      <div className="category-page">
        <Category 
          category={category.name}
          posts={posts} 
          voteScore={category.voteScore} />
      </div>
    )
  }
}

function mapPropsToState({ categories, posts }) {
  return {
    posts: Object.keys(posts).length
      ? Object.keys(posts).reduce((arr, post) => {
        arr.push(posts[post])
        return arr
      }, [])
      : [],
    categories
  }
}

function mapPropsToDispatch(dispatch) {
  return {
    getCategoryPosts: (category) => dispatch(actions.getCategoryPosts(category))
  }
}

export default connect(mapPropsToState, mapPropsToDispatch)(CategoryPage)