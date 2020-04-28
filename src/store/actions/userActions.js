import axios from 'axios'
import {
  GET_USERS,
  ADD_USER,
  DELETE_USER,
  USER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './types'
import { tokenConfig } from './authActions'
import { returnErrors } from './errorActions'

export const getUsers = () => (dispatch) => {
  console.log('here')
  dispatch(setUserLoading())
  axios
    .get('http://localhost:4000/api/users/getUsers')
    .then((res) =>
      dispatch({
        type: GET_USERS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    )
}

export const addUser = (user) => (dispatch) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  }

  axios
    .post('http://localhost:4000/api/users/saveUser', user, config)
    .then((res) => {
      dispatch({
        type: ADD_USER,
        payload: res.data,
      })
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    })
    .catch((err) => {
      dispatch({
        type: REGISTER_FAIL,
      })
      dispatch(returnErrors(err.response.data, err.response.status))
    })
}

// export const DELETE_USER = (id) => (
//   dispatch,
//   getState
// ) => {
//   axios
//     .delete(`/api/users/${id}`, tokenConfig(getState))
//     .then(res =>
//       dispatch({
//         type: DELETE_user,
//         payload: id
//       })
//     )
//     .catch(err =>
//       dispatch(returnErrors(err.response.data, err.response.status))
//     );
// };

export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  }
}
