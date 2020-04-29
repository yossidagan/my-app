import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../store/actions/userActions'
import '../../style/LoginScreen.css'

const LoginScreen = () => {
  const dispatch = useDispatch()

  const error = useSelector((state) => state.error)

  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (error.id === 'LOGIN_FAIL') {
      setErrorMsg(error.msg.msg)
    }
  }, [error])

  const [data, setData] = useState({
    userEmail: '',
    userPassword: '',
  })
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
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
    

       if (error.msg) {
      console.log(error.msg)
      setErrorMsg(error.msg.msg)
    }

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
      {errorMsg ? <div className='errorMsg'>{errorMsg}</div> : null}

      </div>
    </div>
  )
}

export default LoginScreen
