import { Actions, User, ActionTypes } from '../actions';

export function userReducer(
  state: User = { error: false },
  action: Actions
): User {
  switch (action.type) {
    case ActionTypes.fetchUser: {
      return action.payload;
    }

    case ActionTypes.fetchUserFail: {
      return { error: action.payload };
    }

    default: {
      return state;
    }
  }
}
