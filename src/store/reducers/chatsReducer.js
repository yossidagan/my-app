import { SEND_MESSAGE } from '../actions/chatsActions'

const initialState = {
  chats: [],
}

const chatsReducer = (state = initialState, action) => {
  let message = action.payload

  let newMessage = {
    message: message,
  }

  switch (action.type) {
    case SEND_MESSAGE:
      return {
        ...state,
        chats: [...state.chats, newMessage],
      }
    default:
      return state
  }
}

export default chatsReducer
