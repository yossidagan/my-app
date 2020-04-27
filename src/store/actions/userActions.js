import axios from 'axios'
import { GET_USERS, ADD_USER, DELETE_user, USER_LOADING } from './types'
import { tokenConfig } from './authActions'
import { returnErrors } from './errorActions'

export const getUsers = () => (dispatch) => {
  console.log('here')
  dispatch(setusersLoading())
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
  axios
    .post('http://localhost:4000/api/users/saveUser', user)
    .then((res) =>
      dispatch({
        type: ADD_USER,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    )
}

// export const deleteuser = (id) => (
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

export const setusersLoading = () => {
  return {
    type: USER_LOADING,
  }
}
