import { Actions, User, ActionTypes, AccountBook } from '../actions';

export function userReducer(
  state: User = { error: false },
  action: Actions
): User {
  switch (action.type) {
    case ActionTypes.fetchUser: {
      return action.payload;
    }

    case ActionTypes.createAccountBook: {
      if (state.accountBooks) {
        const accountBooks: AccountBook[] = state.accountBooks.concat(
          action.payload
        );

        return { ...state, accountBooks };
      }

      return { ...state, accountBooks: [action.payload] };
    }

    case ActionTypes.createAccountBookFail: {
      return { ...state, error: action.payload };
    }

    case ActionTypes.fetchUserFail: {
      return { error: action.payload };
    }

    case ActionTypes.deleteAccountBook: {
      return action.payload;
    }

    default: {
      return state;
    }
  }
}
