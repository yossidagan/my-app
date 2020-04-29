import axios from 'axios'
import {
  GET_USERS,
  REGISTER_USER,
  DELETE_USER,
  USER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
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

export const registerUser = (user) => (dispatch) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  }

  axios
    .post('http://localhost:4000/api/users/saveUser', user, config)
    .then((res) => {
      dispatch({
        type: REGISTER_USER,
        payload: res.data
      })
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
      dispatch({
        type: REGISTER_FAIL
      })
    })
}


export const loginUser = (user) => (dispatch) => {
  console.log(user)
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  }

  axios
    .post('http://localhost:4000/api/auth/authUser', user, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
      dispatch({
        type: LOGIN_FAIL
      })
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
