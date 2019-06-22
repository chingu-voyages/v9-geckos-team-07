import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

export class AccountBooks extends Component {
  static get propTypes() {
    return {
      user: PropTypes.shape({
        name: PropTypes.string,
        accountBooks: PropTypes.arrayOf(
          PropTypes.shape({
            title: PropTypes.string,
            description: PropTypes.string,
            created: PropTypes.string,
            updated: PropTypes.string,
            accounts: PropTypes.arrayOf(PropTypes.object)
          })
        )
      }).isRequired
    }
  }

  renderBooks() {
    const { books } = this.state

    // eslint-disable-next-line no-underscore-dangle
    return books.map(book => (
      // eslint-disable-next-line no-underscore-dangle
      <li key={book._id}>
        {' '}
        {/* eslint-disable-next-line no-underscore-dangle */}{' '}
        <Link to={`/account-books/${book._id}`}> {book.title} </Link>{' '}
      </li>
    ))
  }

  render() {
    const {
      user: { accountBooks }
    } = this.props

    if (accountBooks.length === 0) {
      return <Redirect to="/account-books/new" />
    }

    return (
      <>
        <header>
          <h2> Account Books </h2>{' '}
        </header>{' '}
        <button type="button"> Create New Account Book </button>{' '}
        <nav>
          <header>
            <h3> List of Account Books </h3>{' '}
          </header>{' '}
          {this.renderBooks()}{' '}
        </nav>{' '}
      </>
    )
  }
}

const ConnectedAccountBooks = connect(({ user }) => ({
  user
}))(AccountBooks)

export { ConnectedAccountBooks }
