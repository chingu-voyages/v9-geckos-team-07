import React, { Component } from 'react'
import axios from 'axios'

class AccountBooks extends Component {
  componentDidMount() {
    this.fetchBooks()
  }

  /* eslint-disable-next-line class-methods-use-this */
  async fetchBooks() {
    const response = await axios.get('/api/books')
    console.log(response)
  }

  render() {
    return <div>Hi There</div>
  }
}

export default AccountBooks
