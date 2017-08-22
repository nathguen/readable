import * as categoryActions from './category'
import * as postActions from './post'
import * as filterActions from './filters'
import * as commentActions from './comments'
import * as profileActions from './profile'

const combinedActions = Object.assign({}, 
  categoryActions, 
  postActions, 
  filterActions, 
  commentActions,
  profileActions
)

export default combinedActions