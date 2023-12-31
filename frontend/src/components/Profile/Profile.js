import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPencilAlt,
  faCheck,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons'
import '../../css/Profile/Profile.css'
const firstNameRegex = /\b([A-Z][a-z]+)/
const lastNameRegex = /\b([A-Z][a-z]+)/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/

const isEditingField = (
  fieldName,
  isEditingFirstname,
  isEditingLastname,
  isEditingEmail,
  isEditingPassword
) => {
  switch (fieldName) {
    case 'firstname':
      return isEditingFirstname
    case 'lastname':
      return isEditingLastname
    case 'email':
      return isEditingEmail
    case 'password':
      return isEditingPassword
    default:
      return false
  }
}

const renderEditIcon = (fieldName, isEditingField) => {
  if (isEditingField) {
    return <FontAwesomeIcon icon={faCheck} className='edit-icon save' />
  } else {
    return (
      <FontAwesomeIcon
        icon={faPencilAlt}
        className='edit-icon edit'
        style={{ marginLeft: 50 }}
      />
    )
  }
}

const NewUpdateProfile = (e, firstname, lastname, email, password, pass) => {
  e.preventDefault()

  try {
    const requestData = {
      firstname,
      lastname,
      email,
      password: password === '' ? pass : password,
    }

    axios
      .patch('http://localhost:5000/profile/' + email, requestData)
      .then((response) => {
        console.log('Update Data------>', response)
        localStorage.setItem('info', JSON.stringify(response.data))
      })
      .catch((error) => {
        console.log('Error updating profile:', error)
      })
  } catch (err) {
    console.log('Error--->', err)
  }
}

function Profile() {
  // Initialize state variables for user data
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [firstnameError, setFirstnameError] = useState('')
  const [lastnameError, setLastnameError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handleFirstnameChange = (e) => {
    const newValue = e.target.value
    setFirstname(newValue)

    // Check if the input value matches the regular expression
    if (!firstNameRegex.test(newValue)) {
      setFirstnameError(
        'First name must start with a capital letter followed by lowercase letters.'
      )
    } else {
      setFirstnameError('')
    }
  }
  const handleLastnameChange = (e) => {
    const newValue = e.target.value
    setLastname(newValue)

    // Check if the input value matches the regular expression
    if (!lastNameRegex.test(newValue)) {
      setLastnameError(
        'Last name must start with a capital letter followed by lowercase letters.'
      )
    } else {
      setLastnameError('')
    }
  }

  const handlePasswordChange = (e) => {
    const newValue = e.target.value
    setPassword(newValue)

    // Check if the input value matches the regular expression
    if (!passwordRegex.test(newValue)) {
      setPasswordError(
        'Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character (!@#%&), and be at least 8 characters long.'
      )
    } else {
      setPasswordError('')
    }
  }

  // Initialize state variables for editing state
  const [isEditingFirstname, setIsEditingFirstname] = useState(false)
  const [isEditingLastname, setIsEditingLastname] = useState(false)
  const [isEditingEmail, setIsEditingEmail] = useState(false)
  const [isEditingPassword, setIsEditingPassword] = useState(false)

  // Fetch user data from localStorage
  const data = JSON.parse(localStorage.getItem('info'))
  const profile = data.allData[0]
  const emailID = profile.email
  const pass = profile.password
  console.log('local pass-->', pass)
  console.log('Email Id--->', emailID)

  // Fetch user data from the server using useEffect
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:5000/register/${emailID}`
        )
        // Update state with the fetched data
        setFirstname(response.data.firstname)
        setLastname(response.data.lastname)
        setEmail(response.data.email)
        setPassword()
      } catch (err) {
        console.log('Data Error:', err)
      }
    }
    fetchData(emailID)
  }, [emailID])

  const handleFieldEdit = (fieldName) => {
    switch (fieldName) {
      case 'firstname':
        setIsEditingFirstname(true)
        break
      case 'lastname':
        setIsEditingLastname(true)
        break
      case 'email':
        setIsEditingEmail(true)
        break
      case 'password':
        setIsEditingPassword(true)
        break
      default:
        break
    }
  }

  const handleFieldSave = (fieldName) => {
    switch (fieldName) {
      case 'firstname':
        setIsEditingFirstname(false)
        break
      case 'lastname':
        setIsEditingLastname(false)
        break
      case 'email':
        setIsEditingEmail(false)
        break
      case 'password':
        setIsEditingPassword(false)
        break
      default:
        break
    }
  }

  return (
    <div>
      <Navbar />
      <div className='profile-box'>
        <div className='profile'>
          <h2>Profile Information</h2>
          <div className='profile-form'>
            <div className='input-group'>
              <label htmlFor='firstName' className='labelProfile '>
                First Name:
              </label>
              {isEditingField(
                'firstname',
                isEditingFirstname,
                isEditingLastname,
                isEditingEmail,
                isEditingPassword
              ) ? (
                <input
                  type='text'
                  id='firstName'
                  name='firstName'
                  value={firstname}
                  onChange={handleFirstnameChange}
                  onBlur={() => handleFieldSave('firstname')}
                />
              ) : (
                <div
                  className='editable'
                  onClick={() => handleFieldEdit('firstname')}
                >
                  {firstname}
                  {renderEditIcon(
                    'firstname',
                    isEditingField(
                      'firstname',
                      isEditingFirstname,
                      isEditingLastname,
                      isEditingEmail,
                      isEditingPassword
                    )
                  )}
                </div>
              )}
              {firstnameError && (
                <div className='error-message'>{firstnameError}</div>
              )}
            </div>

            <div className='input-group'>
              <label htmlFor='lastName' className='labelProfile'>
                Last Name:
              </label>
              {isEditingField(
                'lastname',
                isEditingFirstname,
                isEditingLastname,
                isEditingEmail,
                isEditingPassword
              ) ? (
                <input
                  type='text'
                  id='lastName'
                  name='lastName'
                  value={lastname}
                  onChange={handleLastnameChange}
                  onBlur={() => handleFieldSave('lastname')}
                />
              ) : (
                <div
                  className='editable'
                  onClick={() => handleFieldEdit('lastname')}
                >
                  {lastname}
                  {renderEditIcon(
                    'lastname',
                    isEditingField(
                      'lastname',
                      isEditingFirstname,
                      isEditingLastname,
                      isEditingEmail,
                      isEditingPassword
                    )
                  )}
                </div>
              )}
              {lastnameError && (
                <div className='error-message'>{lastnameError}</div>
              )}
            </div>

            <div className='input-group'>
              <label htmlFor='email' className='labelProfile'>
                Email:
              </label>
              {isEditingField(
                'email',
                isEditingFirstname,
                isEditingLastname,
                isEditingEmail,
                isEditingPassword
              ) ? (
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => handleFieldSave('email')}
                />
              ) : (
                <div
                  className='editable'
                  onClick={() => handleFieldEdit('email')}
                >
                  {email}
                  {renderEditIcon(
                    'email',
                    isEditingField(
                      'email',
                      isEditingFirstname,
                      isEditingLastname,
                      isEditingEmail,
                      isEditingPassword
                    )
                  )}
                </div>
              )}
            </div>

            <div className='input-group'>
              <label htmlFor='password' className='labelProfile'>
                New Password:
              </label>
              {isEditingField(
                'password',
                isEditingFirstname,
                isEditingLastname,
                isEditingEmail,
                isEditingPassword
              ) ? (
                <div className='password-input'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id='password'
                    name='password'
                    value={password}
                    onChange={handlePasswordChange}
                    onBlur={() => handleFieldSave('password')}
                  />
                  <i
                    onClick={() => setShowPassword(!showPassword)}
                    className='password-toggle-button i-profile'
                  >
                    <FontAwesomeIcon
                      icon={showPassword ? faEye : faEyeSlash}
                      className='password-icon'
                    />
                  </i>
                </div>
              ) : (
                <div
                  className='editable'
                  onClick={() => handleFieldEdit('password')}
                >
                  ********
                  {renderEditIcon(
                    'password',
                    isEditingField(
                      'password',
                      isEditingFirstname,
                      isEditingLastname,
                      isEditingEmail,
                      isEditingPassword
                    )
                  )}
                </div>
              )}
              {passwordError && (
                <div className='error-message'>{passwordError}</div>
              )}
            </div>
          </div>
          <button
            onClick={(e) =>
              NewUpdateProfile(
                e,
                firstname,
                lastname,
                email,
                password,
                handleFieldSave,
                pass
              )
            }
            className='logoutButton lgbutton'
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
