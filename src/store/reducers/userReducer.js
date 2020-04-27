import {
  GET_USERS,
  ADD_USER,
  DELETE_USER,
  USERS_LOADING,
} from '../actions/types'

const initialState = {
  users: [],
  loading: false,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      }
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      }
    case ADD_USER:
      console.log('payload', action.payload.user)
      return {
        ...state,
        users: [...state.users, action.payload.user],
      }
    case USERS_LOADING:
      return {
        ...state,
        loading: true,
      }
    default:
      return state
  }
}

export default userReducer
