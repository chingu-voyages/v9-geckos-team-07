import { Actions, ActionTypes, CompleteUser } from '../actions';

const initialState: CompleteUser = {
  _id: '',
  name: '',
  googleId: '',
  photo: '',
  accountBooks: [],
  emails: [],
  error: false
};

export function userReducer(
  state: CompleteUser = initialState,
  action: Actions
): CompleteUser {
  switch (action.type) {
    case ActionTypes.fetchUser: {
      return action.payload;
    }

    case ActionTypes.createAccountBook: {
      if (state.accountBooks.length > 0) {
        return {
          ...state,
          accountBooks: state.accountBooks.concat(action.payload)
        };
      }

      return { ...state, accountBooks: [action.payload] };
    }

    case ActionTypes.createAccountBookFail: {
      return { ...state, error: action.payload };
    }

    case ActionTypes.fetchUserFail: {
      return { ...state, error: action.payload };
    }

    case ActionTypes.deleteAccountBook: {
      return { ...state, accountBooks: action.payload };
    }

    default: {
      return state;
    }
  }
}
