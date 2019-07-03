import React, { Component, ChangeEvent, FormEvent } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {
  newAccountBook,
  AccountBook,
  AccountBookWithTemplate,
  Template
} from '../../actions';
import { StoreState } from '../../reducers';

interface NewAccountBookProps extends RouteComponentProps {
  newAccountBook: (accountBook: AccountBook | AccountBookWithTemplate) => void;
  error: false | string;
}

export class NewAccountBook extends Component<NewAccountBookProps> {
  public state = { title: '', description: '', template: 'checking' };

  private onSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    const { title, description, template } = this.state;

    if (template === Template.Checking) {
      const success = await this.props.newAccountBook({
        title,
        description,
        accounts: [],
        template: Template.Checking
      });

      if (Boolean(success)) {
        return this.props.history.push('/account-books');
      }
    }

    const success = await this.props.newAccountBook({
      title,
      description,
      accounts: []
    });
    if (Boolean(success)) {
      return this.props.history.push('/account-books');
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
    const { error } = this.props;

    return (
      <form action="post" onSubmit={this.onSubmit}>
        <header>
          <h2>New Account Book</h2>
          <p>{error ? error : ''}</p>
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
          <select
            onChange={this.onUpdateTemplate}
            defaultValue={this.state.template}
          >
            <option value="custom">Custom: (no accounts)</option>
            <option value="checking">Checking Book Template</option>
          </select>
        </label>

        <button type="submit">Create New Account Book</button>
      </form>
    );
  }
}

function mapStateToProps({ user }: StoreState): { error: string | false } {
  if (user.error) {
    return { error: user.error };
  }

  return { error: false };
}

export const ConnectedNewAccountBook = connect<
  {},
  {
    newAccountBook: (
      accountBook: AccountBook | AccountBookWithTemplate
    ) => void;
  },
  NewAccountBookProps,
  StoreState
>(
  mapStateToProps,
  { newAccountBook }
)(withRouter(NewAccountBook));
