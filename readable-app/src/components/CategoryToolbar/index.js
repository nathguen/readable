import React from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import {
  FlatButton,
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  IconMenu,
  MenuItem,
} from 'material-ui'
import FaSortAlphaAsc from 'react-icons/lib/fa/sort-alpha-asc'
import FaSortAlphaDesc from 'react-icons/lib/fa/sort-alpha-desc'
import MdThumbsUp from 'react-icons/lib/md/thumb-up'
import MdThumbsDown from 'react-icons/lib/md/thumb-down'
import MdAdd from 'react-icons/lib/md/add'
import { Link } from 'react-router-dom'

const CategoryToolbar = (props) => {
  const { category, filter, dispatch } = props

  return (
    <Toolbar className="category-toolbar readable-toolbar">
    <ToolbarGroup >
      <Link to={`/category/${category.path}`}>
        <FlatButton className="toolbar-button">
          {category.name}
        </FlatButton>
      </Link>
    </ToolbarGroup>
    <ToolbarGroup>
      <div className="toolbar-sort-buttons">
        <FlatButton
          className={
              filter.filter === 'name'
            ? 'toolbar-button active-filter-button'
            : 'toolbar-button'
          }
          onClick={() => dispatch(actions.setCategoryFilter({
            filter: 'name',
            name: category.name
          }))}>
          {filter.filter === 'name' && filter.direction
            ? <FaSortAlphaAsc />
            : <FaSortAlphaDesc />}
        </FlatButton>
        <FlatButton
          className={
            filter.filter === 'voteScore'
            ? 'toolbar-button active-filter-button'
            : 'toolbar-button'
          }
          onClick={() => dispatch(actions.setCategoryFilter({
            filter: 'voteScore',
            name: category.name
          }))}>
          {filter.filter === 'voteScore' && filter.direction
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
        <MenuItem 
          onClick={() => dispatch(actions.setupCreatePost(category.name))}
          primaryText="Post" />
      </IconMenu>
    </ToolbarGroup>
    <div className="toolbar-vote-score-container">
      <span className="toolbar-vote-score">
        {(category.voteScore > 0) && (
          <span>+</span>
        )}
        {category.voteScore}
      </span>
    </div>
  </Toolbar>
  )
}

export default connect()(CategoryToolbar)