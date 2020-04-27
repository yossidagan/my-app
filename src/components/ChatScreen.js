import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sendMessage } from '../store/actions/chatsActions'
import { addUser } from '../store/actions/userActions'
import io from 'socket.io-client'

const ChatScreen = () => {
  let usersFromState = useSelector((state) => state.userState.users)

  const [usersArray, setUsersArray] = useState('')
  // setUsersArray(usersFromState)

  const [data, setData] = useState({
    userEmail: '',
    userPassword: '',
    message: '',
  })

  const dispatch = useDispatch()

  let chatsFromState = useSelector((state) => state.chatsState.chats)

  const socket = io('localhost:4000')

  socket.on('RECEIVE_MESSAGE', (msgReceived) => {
    console.log('msgReceived ', msgReceived)
  })

  useEffect(() => {
    setUsersArray(usersFromState)
  }, [])

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value })

  const handlePress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  const handleSendMessage = async () => {
    socket.emit('SEND_MESSAGE', data.message)
    await dispatch(sendMessage(data.message))
    // data.message = ''
  }

  const handleAddUser = async () => {
    const newUser = {
      email: data.userEmail,
      password: data.userPassword,
    }
    await dispatch(addUser(newUser))
  }

  return (
    <div className="chatScreen">
      <div className="">HI</div>
      <input
        name="message"
        value={data.message}
        onChange={handleChange}
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
        name="userEmail"
        value={data.userEmail}
        onChange={handleChange}
        onKeyPress={handlePress}
        placeholder="New user email here..."
        className="userInput"
      />
      <input
        name="userPassword"
        value={data.userPassword}
        onChange={handleChange}
        onKeyPress={handlePress}
        placeholder="New user password here..."
        className="userInput"
      />
      <div className="addUserBtn" onClick={handleAddUser}>
        Add User
      </div>
      <div className="usersContainer">
      {usersFromState.map((user, i) => (
          <div className="messageBox" key={i}>
            user : {user.email}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChatScreen
