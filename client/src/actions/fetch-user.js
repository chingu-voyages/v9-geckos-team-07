import axios from 'axios'
import { FETCH_USER, FETCH_USER_FAIL } from './types'

export const fetchUser = () => async dispatch => {
  try {
    const response = await axios.get('/auth/current_user')

    dispatch({ type: FETCH_USER, payload: response.data })
  } catch (error) {
    dispatch({ type: FETCH_USER_FAIL, payload: 'not logged in' })
  }
}
