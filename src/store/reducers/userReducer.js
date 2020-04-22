import {
    GET_USERS,
    ADD_ITEM,
    DELETE_ITEM,
  } from '../actions/types';
  
  const initialState = {
    users: [],
    loading: false
  };
  
  export default function(state = initialState, action) {
      switch (action.type) {
          case GET_USERS:
            console.log('K')
        return {
          ...state,
          users: action.payload,
          loading: false
        };
      case DELETE_ITEM:
        return {
          ...state,
          users: state.users.filter(user => user._id !== action.payload)
        };
      case ADD_ITEM:
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
  }