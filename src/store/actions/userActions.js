import axios from 'axios';
import { GET_users, ADD_user, DELETE_user, users_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import { API_URL} from './../../../config/api_url'


export const getusers = () => (dispatch) => {
  dispatch(setusersLoading());
  axios
    .get(`${API_URL}/api/users`)
    .then(res =>
      dispatch({
        type: GET_users,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const adduser = (user) => (
  dispatch
) => {
  axios
    .post('/api/users', user)
    .then(res =>
      dispatch({
        type: ADD_user,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteuser = (id) => (
  dispatch,
  getState
) => {
  axios
    .delete(`/api/users/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_user,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setusersLoading = () => {
  return {
    type: users_LOADING
  };
};