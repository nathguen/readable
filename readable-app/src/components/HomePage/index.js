import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import CategoryList from '../CategoryList'
import {
  Toolbar,
  ToolbarGroup,
  ToolbarTitle,
  MenuItem,
  ToolbarSeparator,
  FlatButton,
  IconMenu,
  Paper
} from 'material-ui'
import MdAdd from 'react-icons/lib/md/add'
import FaSortAlphaAsc from 'react-icons/lib/fa/sort-alpha-asc'
import FaSortAlphaDesc from 'react-icons/lib/fa/sort-alpha-desc'
import MdThumbsUp from 'react-icons/lib/md/thumb-up'
import MdThumbsDown from 'react-icons/lib/md/thumb-down'
import './styles.css'


class HomePage extends Component {
  constructor(props) {
    super(props)
    this.props.getPosts()
    this.props.getCategories()
  }

  render() {
    const { categories, posts, setFilter, listFilter } = this.props
    const filterType = listFilter.filter

    return (
      <div className="home-page">
        <Paper zDepth={3} className="dashboard-toolbar-container">
          <Toolbar className="dashboard-toolbar readable-toolbar">
            <ToolbarGroup>
              <ToolbarTitle text="Categories" />
            </ToolbarGroup>
            <ToolbarGroup>
              <div className="toolbar-sort-buttons">
                <FlatButton 
                  className="toolbar-button"
                  primary={filterType === 'name'}
                  onClick={() => setFilter('name')}>
                  {listFilter.filter === 'name' && listFilter.direction
                    ? <FaSortAlphaAsc />
                    : <FaSortAlphaDesc />}
                </FlatButton>
                <FlatButton
                  className="toolbar-button"
                  primary={filterType === 'voteScore'}
                  onClick={() => setFilter('voteScore')}>
                  {listFilter.filter === 'voteScore' && listFilter.direction
                    ? <MdThumbsDown />
                    : <MdThumbsUp />}
                </FlatButton>
              </div>
              <ToolbarSeparator className="toolbar-separator" />
              <IconMenu
                iconButtonElement={
                  <FlatButton 
                    className="toolbar-button toolbar-add-button">
                    <MdAdd />
                  </FlatButton>
                }>
                <MenuItem primaryText="Category" />
              </IconMenu>
            </ToolbarGroup>
          </Toolbar>
        </Paper>
        <CategoryList
          categories={categories}
          posts={posts}
          listFilter={listFilter} />
      </div>
    )
  }
}

function mapPropsToState({ posts, categories, filters }) {
  // transforms the posts and categories from an object map to an array
  return {
    posts: Object.keys(posts).length
      ? Object.keys(posts).reduce((arr, post) => {
        arr.push(posts[post])
        return arr
      }, [])
      : [],
    categories: Object.keys(categories).length
      ? Object.keys(categories).reduce((arr, cat) => {
        arr.push(categories[cat])
        return arr
      }, [])
      : [],
    listFilter: filters.categoriesList
  }
}

function mapPropsToDispatch(dispatch) {
  return {
    getPosts: () => {
      dispatch(actions.getAllPosts())
    },
    getCategories: () => dispatch(actions.getAllCategories()),
    setFilter: (filter) => dispatch(actions.setCategoryListFilter({ filter }))
  }
}

export default connect(mapPropsToState, mapPropsToDispatch)(HomePage)