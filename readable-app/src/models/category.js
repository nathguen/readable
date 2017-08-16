import PropTypes from 'prop-types'

export const CategoryType = {
    name: PropTypes.string.isRequired,
    path: PropTypes.string,
    voteScore: PropTypes.number.isRequired
}