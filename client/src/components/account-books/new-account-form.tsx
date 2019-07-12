import React, { Component } from 'react';
import { Account, AccountType } from '../../actions';

interface NewAccountFormState {
  account: Account;
}

interface NewAccountFormProps {
  close: () => void;
}

export class NewAccountForm extends Component<
  NewAccountFormProps,
  NewAccountFormState
> {
  public readonly state: NewAccountFormState = {
    account: {
      name: '',
      type: AccountType.Asset,
      description: '',
      placeholder: false,
      parent: ''
    }
  };

  private onFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    this.props.close();
  };

  private onFormChange = (
    event: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    if (
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLSelectElement
    ) {
      const { name, value } = event.target;

      this.setState(prevState => {
        if (prevState.account.hasOwnProperty(name)) {
          return {
            account: { ...prevState.account, [name]: value }
          };
        }
      });
    }
  };

  public render(): JSX.Element {
    const {
      account: { name, type, description, placeholder, parent }
    } = this.state;

    const { close } = this.props;

    return (
      <form onSubmit={this.onFormSubmit}>
        <header>
          <h2>New Account</h2>
        </header>

        <div>
          <ul>
            <li>
              <label>
                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.onFormChange}
                />
              </label>
            </li>

            <li>
              <label>
                <span>Description</span>
                <input
                  type="text"
                  name="description"
                  value={description}
                  onChange={this.onFormChange}
                />
              </label>
            </li>

            <li>
              <label>
                <span>Type</span>
                <select name="type" value={type} onChange={this.onFormChange}>
                  <option value={AccountType.Asset}>{AccountType.Asset}</option>
                  <option value={AccountType.Equity}>
                    {AccountType.Equity}
                  </option>
                  <option value={AccountType.Liability}>
                    {AccountType.Liability}
                  </option>
                </select>
              </label>
            </li>
          </ul>
        </div>

        <footer>
          <button onClick={close} type="button">
            Close
          </button>
          <button type="submit">Submit</button>
        </footer>
      </form>
    );
  }
}
