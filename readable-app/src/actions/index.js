import * as categoryActions from './category'
import * as postActions from './post'
import * as filterActions from './filters'
import * as commentActions from './comments'

const combinedActions = Object.assign({}, 
  categoryActions, 
  postActions, 
  filterActions, 
  commentActions
)

export default combinedActions