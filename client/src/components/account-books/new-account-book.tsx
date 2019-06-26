import React, { Component, ChangeEvent, FormEvent } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {
  newAccountBook,
  AccountBook,
  AccountBookWithTemplate,
  Template
} from '../../actions';

interface NewAccountBookProps extends RouteComponentProps {
  newAccountBook: (accountBook: AccountBook | AccountBookWithTemplate) => void;
}

export class NewAccountBook extends Component<NewAccountBookProps> {
  public state = { title: '', description: '', template: '' };

  private onSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    const { title, description, template } = this.state;

    if (template === Template.Checking) {
      const success = await this.props.newAccountBook({
        title,
        description,
        template: Template.Checking
      });

      console.log(success);

      if (Boolean(success)) {
        return this.props.history.push('/account-books');
      }
    }

    const success = await this.props.newAccountBook({ title, description });
    if (Boolean(success)) {
      return this.props.history.push('/');
    }
  };

  private onUpdateTitle = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ title: event.target.value });
  };

  private onUpdateDescription = (
    event: ChangeEvent<HTMLTextAreaElement>
  ): void => {
    this.setState({ description: event.target.value });
  };

  private onUpdateTemplate = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value: template } = event.target;

    this.setState({ template });
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

        <label>
          <div>template:</div>
          <select onChange={this.onUpdateTemplate}>
            <option value="custom">Custom: (no accounts)</option>
            <option value="checking">Checking Book Template</option>
          </select>
        </label>

        <button type="submit">Create New Account Book</button>
      </form>
    );
  }
}

export const ConnectedNewAccountBook = connect(
  null,
  { newAccountBook }
)(withRouter(NewAccountBook));
