import { SEND_MESSAGE } from "../actions/chatsActions";

const initialState = {
  chats: []
};

const chatsReducer = (state = initialState, action) => {
  let message = action.message;
  console.log("message in reducer is ", message);

  let newMessage = {
    control: "dddd",
    message: message
  };

  switch (action.type) {
    case SEND_MESSAGE:
      let newState = { ...state, chats: state.chats.push(newMessage) };

      return state;
    default:
      return state;
  }
  return state;
};

export default chatsReducer;
