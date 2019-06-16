import React, { Component } from 'react'
import Axios from 'axios'

/**
 * New Account Book Component
 * @class
 */
class NewAccountBook extends Component {
  state = { title: '', description: '' }

  /**
   * Submit new account book
   *
   * @param {event} event submission event
   */
  onSubmit = event => {
    event.preventDefault()

    const { title, description } = this.state

    if (title && description) {
      Axios.post('/api/books', { title, description })
        .then(() => {
          console.log('okay')
        })
        .catch(error => {
          console.error(error.message)
        })
    }
  }

  /**
   * Update the title state
   *
   * @param {event} event change event
   */
  onUpdateTitle = event => {
    this.setState({ title: event.target.value })
  }

  /**
   * Update the description state
   *
   * @param {event} event change event
   */
  onUpdateDescription = event => {
    this.setState({ description: event.target.value })
  }

  /**
   * Render output
   */
  render() {
    const { title, description } = this.state
    return (
      <form action="post" onSubmit={this.onSubmit}>
        <header>
          <h2>New Account Book</h2>
        </header>

        <label>
          Title:{' '}
          <input type="text" value={title} onChange={this.onUpdateTitle} />
        </label>

        <label>
          <div>description:</div>
          <textarea
            onChange={this.onUpdateDescription}
            cols="30"
            rows="10"
            value={description}
          />
        </label>

        <button type="submit">Create New Account Book</button>
      </form>
    )
  }
}

export default NewAccountBook
