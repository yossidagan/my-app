import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../store/actions/userActions'
import '../../style/LoginScreen.css'

const LoginScreen = () => {
  const dispatch = useDispatch()

  const [data, setData] = useState({
    userEmail: '',
    userPassword: '',
  })
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
    data[e.target.name] = ''
  }

  const handlePress = (e) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  const handleLogin = () => {
    const userCreds = {
      email: data.userEmail,
      password: data.userPassword,
    }
    dispatch(loginUser(userCreds))
  }

  return (
    <div className='loginScreenContainer'>
      <div className='contentContainer'>
        <input
          name='userEmail'
          value={data.userEmail}
          onChange={handleChange}
          onKeyPress={handlePress}
          placeholder='Email here...'
          className='registerInput'
        />
        <input
          name='userPassword'
          value={data.userPassword}
          onChange={handleChange}
          onKeyPress={handlePress}
          placeholder='Password here...'
          className='registerInput'
        />
        <div className='loginUserBtn' onClick={handleLogin}>
          Login User
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
