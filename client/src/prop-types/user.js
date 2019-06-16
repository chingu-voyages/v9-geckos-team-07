import PropTypes from 'prop-types'

export default PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    emails: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string }))
      .isRequired,
    photo: PropTypes.string.isRequired,
    googleId: PropTypes.string.isRequired
  }),
  PropTypes.shape({
    error: PropTypes.shape({ message: PropTypes.string.isRequired }).isRequired
  })
])
