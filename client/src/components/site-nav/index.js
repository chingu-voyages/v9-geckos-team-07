import { connect } from 'react-redux'

import SiteNav from './site-nav'

export default connect(({ user }) => ({ user }))(SiteNav)
