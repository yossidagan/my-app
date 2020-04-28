import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import '../../style/RegisterScreen.css'
import { addUser } from '../../store/actions/userActions'

const RegisterScreen = () => {
  const dispatch = useDispatch()

  let usersFromState = useSelector((state) => state.userState.users)
  const [usersArray, setUsersArray] = useState('')

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const error = useSelector((state) => state.error)

  useEffect(() => {
    setUsersArray(usersFromState)
  }, [])

  const [data, setData] = useState({
    userName: '',
    userEmail: '',
    userPassword: '',
  })

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
    data[e.target.name] = ''
  }

  const handlePress = (e) => {
    if (e.key === 'Enter') {
      handleRegister()
    }
  }

  const handleRegister = async () => {
    const newUser = {
      email: data.userEmail,
      password: data.userPassword,
    }
    await dispatch(addUser(newUser))
  }

  return (
    <div className='registerScreen'>
      <div className='inputContainer'>
        <input
          name='userName'
          value={data.userName}
          onChange={handleChange}
          onKeyPress={handlePress}
          placeholder='Name here...'
          className='registerInput'
        />
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
      </div>
      <div className='registerUserBtn' onClick={handleRegister}>
        Register User
      </div>
      <div className='usersContainer'>
        {usersFromState.map((user, i) => (
          <div className='messageBox' key={i}>
            user : {user.email}
          </div>
        ))}
      </div>
    </div>
  )
}

RegisterScreen.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object,
}

export default RegisterScreen
