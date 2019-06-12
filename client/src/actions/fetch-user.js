import axios from 'axios'
import { FETCH_USER } from './types'

export const fetchUser = () => async dispatch => {
  try {
    const response = await axios.get('/auth/current_user')

    dispatch({ type: FETCH_USER, payload: response.data })
  } catch (error) {
    console.error('not logged in')
  }
}
