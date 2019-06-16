import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'

class AccountBooks extends Component {
  state = { books: [], fetched: false }

  componentDidMount() {
    this.fetchBooks()
  }

  async fetchBooks() {
    const response = await axios.get('/api/books')

    this.setState({ books: response.data, fetched: true })
  }

  renderBooks() {
    const { books } = this.state

    // eslint-disable-next-line no-underscore-dangle
    return books.map(book => (
      // eslint-disable-next-line no-underscore-dangle
      <li key={book._id}>
        {/* eslint-disable-next-line no-underscore-dangle */}
        <Link to={`/account-books/${book._id}`}>{book.title}</Link>
      </li>
    ))
  }

  render() {
    const { books, fetched } = this.state

    if (books.length === 0 && fetched === true) {
      return <Redirect to="/account-books/new" />
    }

    return (
      <>
        <header>
          <h2>Account Books</h2>
        </header>

        <button type="button">Create New Account Book</button>

        <nav>
          <header>
            <h3>List of Account Books</h3>
          </header>

          {this.renderBooks()}
        </nav>
      </>
    )
  }
}

export default AccountBooks
