import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../store/actions/chatsActions";
import io from "socket.io-client";

const ChatScreen = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  let chatsFromState = useSelector(state => state.chatsState.chats);

  const socket = io("localhost:4000");

  socket.on("RECEIVE_MESSAGE", msgReceived => {
    console.log("msgReceived ", msgReceived);
  });
  
  useEffect(() => {
  
  }, []);

  const handleChange = e => setMessage(e.target.value);

  const handleSendMessage = async () => {
    socket.emit("SEND_MESSAGE", message);
    await dispatch(sendMessage(message));
    setMessage("");
    console.log(chatsFromState);
  };

  return (
    <div className="chatScreen">
      <div className="">HI</div>
      <input
        value={message}
        onChange={handleChange}
        placeholder="Your message here..."
      />
      <div className="sendBtn" onClick={handleSendMessage}>
        Send
      </div>
      <div className="messagesContainer">
        {chatsFromState.map((chat, i) => (
          <div className="messageBox" key={i}>
            message : {chat.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatScreen;
