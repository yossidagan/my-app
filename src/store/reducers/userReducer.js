import {
    GET_USERS,
    ADD_USER,
    DELETE_USER,
    USERS_LOADING
  } from '../actions/types';
  
  const initialState = {
    users: [],
    loading: false
  };
  

  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_USERS:
        console.log('K')
    return {
      ...state,
      users: action.payload,
      loading: false
    };
  case DELETE_USER:
    return {
      ...state,
      users: state.users.filter(user => user._id !== action.payload)
    };
  case ADD_USER:
    return {
      ...state,
      users: [action.payload, ...state.users]
    };
  case USERS_LOADING:
    return {
      ...state,
      loading: true
    };
  default:
    return state;
}
  };
  
  export default userReducer
