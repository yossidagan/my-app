import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sendMessage } from '../store/actions/chatsActions'
import { getusers } from '../store/actions/userActions'
import io from 'socket.io-client'

const ChatScreen = () => {
  const [message, setMessage] = useState('')
  const [newUser, setNewUser] = useState('')

  const dispatch = useDispatch()

  let chatsFromState = useSelector((state) => state.chatsState.chats)

  const socket = io('localhost:4000')

  socket.on('RECEIVE_MESSAGE', (msgReceived) => {
    console.log('msgReceived ', msgReceived)
  })

  useEffect(() => {}, [])

  const handleMessageChange = (e) => setMessage(e.target.value)
  const handleUserChange = (e) => setNewUser(e.target.value)

  const handlePress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  const handleSendMessage = async () => {
    socket.emit('SEND_MESSAGE', message)
    await dispatch(sendMessage(message))
    setMessage('')
  }

  const handleAddUser = async () => {}

  return (
    <div className="chatScreen">
      <div className="">HI</div>
      <input
        value={message}
        onChange={handleMessageChange}
        onKeyPress={handlePress}
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

      <input
        value={newUser}
        onChange={handleUserChange}
        onKeyPress={handlePress}
        placeholder="New user here..."
        className="userInput"
      />

      <div className="addUserBtn" onClick={handleAddUser}>
        Add User
      </div>
    </div>
  )
}

export default ChatScreen
