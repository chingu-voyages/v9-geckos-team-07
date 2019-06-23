import React, { Component, ChangeEvent, FormEvent } from 'react';
import { connect } from 'react-redux';

class _NewAccountBook extends Component {
  state = { title: '', description: '' };

  onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  onUpdateTitle = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: event.target.value });
  };

  onUpdateDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ description: event.target.value });
  };

  render() {
    const { title, description } = this.state;

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
            cols={30}
            rows={10}
            value={description}
          />
        </label>

        <button type="submit">Create New Account Book</button>
      </form>
    );
  }
}

export const NewAccountBook = connect()(_NewAccountBook);
