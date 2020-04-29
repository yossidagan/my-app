import React from 'react'
import LogoutButton from './LogoutButton'
import { Link } from 'react-router-dom'
import '../style/Navbar.css'

const Navbar = () => {
  return (
    <div className='navbarContainer'>
             <div className='navbarItem home'>
        <Link to='/'>Home</Link>
      </div>
      <div className='navbarItem'>
        <LogoutButton />
      </div>
      <div className='navbarItem'>
        <Link to='/login-screen'>Login</Link>
      </div>
 
    </div>
  )
}

export default Navbar
