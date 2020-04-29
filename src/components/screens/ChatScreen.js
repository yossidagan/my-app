import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sendMessage } from '../../store/actions/chatsActions'
import { registerUser } from '../../store/actions/userActions'
import io from 'socket.io-client'
import '../../style/ChatScreen.css'
import RegisterScreen from './RegisterScreen'

const ChatScreen = () => {
  const dispatch = useDispatch()

  let usersFromState = useSelector((state) => state.userState.users)
  let chatsFromState = useSelector((state) => state.chatsState.chats)

  const [usersArray, setUsersArray] = useState('')

  const [data, setData] = useState({
    message: '',
  })

  const socket = io('localhost:4000')

  socket.on('RECEIVE_MESSAGE', (msgReceived) => {
    console.log('msgReceived ', msgReceived)
  })

  useEffect(() => {
    setUsersArray(usersFromState)
  }, [])

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
    data.message = ''
  }

  const handlePress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  const handleSendMessage = async () => {
    socket.emit('SEND_MESSAGE', data.message)
    await dispatch(sendMessage(data.message))
  }

  return (
    <div className='chatScreen'>
      <div className=''>HI</div>
      <input
        name='message'
        value={data.message}
        onChange={handleChange}
        onKeyPress={handlePress}
        placeholder='Your message here...'
      />
      <div className='sendBtn' onClick={handleSendMessage}>
        Send
      </div>
      <div className='messagesContainer'>
        {chatsFromState.map((chat, i) => (
          <div className='messageBox' key={i}>
            message : {chat.message}
          </div>
        ))}
      </div>

      <RegisterScreen />
    </div>
  )
}

export default ChatScreen
