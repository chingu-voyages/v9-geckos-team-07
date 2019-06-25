import React, { Component, ChangeEvent, FormEvent } from 'react';
import { connect } from 'react-redux';

export class NewAccountBook extends Component {
  public state = { title: '', description: '' };

  private onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  };

  private onUpdateTitle = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ title: event.target.value });
  };

  private onUpdateDescription = (
    event: ChangeEvent<HTMLTextAreaElement>
  ): void => {
    this.setState({ description: event.target.value });
  };

  public render(): JSX.Element {
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

export const ConnectedNewAccountBook = connect()(NewAccountBook);
