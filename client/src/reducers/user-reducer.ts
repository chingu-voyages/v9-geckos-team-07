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
    case ActionTypes.FetchUser: {
      return action.payload;
    }

    case ActionTypes.CreateAccountBook: {
      if (state.accountBooks.length > 0) {
        return {
          ...state,
          accountBooks: state.accountBooks.concat(action.payload)
        };
      }

      return { ...state, accountBooks: [action.payload] };
    }

    case ActionTypes.CreateAccountBookFail: {
      return { ...state, error: action.payload };
    }

    case ActionTypes.FetchUserFail: {
      return { ...state, error: action.payload };
    }

    case ActionTypes.DeleteAccountBook: {
      const accountBooks = state.accountBooks.filter(
        book => book._id !== action.payload
      );

      return { ...state, accountBooks };
    }

    default: {
      return state;
    }
  }
}
