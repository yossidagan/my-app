import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import '../../style/RegisterScreen.css'

const RegisterScreen = () => {
  const isAuthenticated = useSelector(state.auth.isAuthenticated)
  const error = useSelector(state.error)

  const [state, setState] = useState({
    modal: false,
    name: '',
    email: '',
    password: '',
    msg: null,
  })

  const handleChange = (name, value) => setState({ ...state, [name]: value })

  const handlePress = (e) => {
    if (e.key === 'Enter') {
      handleRegister()
    }
  }

  
  const handleRegister = async () => {
    const newUser = {
      email: state.userEmail,
      password: state.userPassword,
    }
    // await dispatch(addUser(newUser))
  }

  return (
    <div className="registerScreen">
      <input
        name="userEmail"
        value={state.userEmail}
        onChange={handleChange}
        onKeyPress={handlePress}
        placeholder="New user email here..."
        className="userInput"
      />
      <input
        name="userPassword"
        value={state.userPassword}
        onChange={handleChange}
        onKeyPress={handlePress}
        placeholder="New user password here..."
        className="userInput"
      />
      <div className="addUserBtn" onClick={handleRegister}>
        Register User
      </div>
    </div>
  )
}

RegisterScreen.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
}

export default RegisterScreen
