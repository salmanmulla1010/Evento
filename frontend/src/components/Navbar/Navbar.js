import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import eventLogo from '../../css/Photos/eventologo.png'
import '../../css/Navbar/Navbar.css'
import axios from 'axios'

const Navbar = () => {
  const [first, setFirstname] = useState()
  // Fetch user data from localStorage
  const data = JSON.parse(localStorage.getItem('info'))
  const profile = data.allData[0]
  const emailID = profile.email

  // Fetch user data from the server using useEffect
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:5000/register/${emailID}`
        )
        // Update state with the fetched data
        setFirstname(response.data.firstname)
      } catch (err) {
        console.log('Data Error:', err)
      }
    }
    fetchData(emailID)
  }, [emailID])

  const logout = () => {
    localStorage.clear()
  }

  return (
    <nav className='navbar '>
      <div className='logo'>
        <img src={eventLogo} alt='Event logo' />
      </div>
      <div className='nav-items'>
        <ul className='nav-links'>
          <li>
            <Link to='/' className='link-nav'>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to='/profile' className='link-nav'>
              Profile
            </Link>
          </li>
          <li>
            <div className='username'>
              <Link className='link-nav'>@{first}</Link>
            </div>
            <div>
              <Link onClick={logout} to={'/login'} className='logoutButton'>
                Logout
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
