import { FETCH_USER, FETCH_USER_FAIL } from '../actions/types'

export const initState = 'pending'

export const actionType = {
  type: String,
  payload: null
}

export default (state = initState, action = actionType) => {
  switch (action.type) {
    case FETCH_USER: {
      return action.payload
    }

    case FETCH_USER_FAIL: {
      return { error: { message: action.payload } }
    }

    default: {
      return state
    }
  }
}
