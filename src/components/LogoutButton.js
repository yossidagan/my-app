import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../store/actions/authActions'
import '../style/LogoutButton.css'


const Logout = () => {

    const dispatch = useDispatch()

    const handleLogout = () => dispatch(logout())

    return (
        <div className='logoutBtn' onClick={handleLogout}>Logout</div>
    )
}

export default Logout