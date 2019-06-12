import { FETCH_USER } from '../actions/types'

export const initState = false

export const actionType = {
  type: String,
  payload: null
}

export default (state = initState, action = actionType) => {
  switch (action.type) {
    case FETCH_USER: {
      return action.payload
    }

    default: {
      return state
    }
  }
}
