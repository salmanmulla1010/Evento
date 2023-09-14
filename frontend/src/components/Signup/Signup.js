import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import LockSharpIcon from '@mui/icons-material/LockSharp'
import NoEncryptionSharpIcon from '@mui/icons-material/NoEncryptionSharp'
import Clipart from '../../css/Photos/ClipArt.jpg'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Signup = () => {
  const navigate = useNavigate()
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateFirstname(firstname)) {
      if (validateLastname(lastname)) {
        if (validateEmail(email)) {
          if (validatePassword(password)) {
            navigate('/login')
            try {
              const response = await axios.post(
                'http://localhost:5000/register',
                {
                  firstname,
                  lastname,
                  email,
                  password,
                }
              )
              console.log('User Created')
              response.send('Hello back ')
            } catch (error) {
              console.log('Error: ', error)
            }
          } else {
            toast.error('please enter Strong password', {
              position: 'top-center',
              theme: 'colored',
            })
          }
        } else {
          toast.error(' Please enter a valid email!', {
            position: 'top-center',
            theme: 'colored',
          })
        }
      } else {
        toast.error('First character should be capital', {
          position: 'top-center',
          theme: 'colored',
        })
      }
    } else {
      toast.error('First Character should be capital', {
        position: 'top-center',
        theme: 'colored',
      })
    }
  }
  // regular expression for first name validation
  const validateFirstname = (firstname) => {
    const regex = /\b([A-Z][a-z]+)/.test(firstname)
    //.test method check regular expression is match with given parameter
    return regex
  }
  // regular expression for first name validation
  const validateLastname = (lastname) => {
    const regex = /\b([A-Z][a-z]+)/.test(lastname)
    //.test method check regular expression is match with given parameter
    return regex
  }
  // regular expression for email validation
  const validateEmail = (email) => {
    const checkEmail =
      /^[a-z][\w]*@*[a-z]*\.*[\w]{3,}(\.)*(com)*(@[a-z]{1,}\.com)/
    //.test method check regular expression is match with given parameter then return
    return checkEmail.test(email)
  }
  // regular expression for password validation
  const validatePassword = (password) => {
    const checkPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/
    //.test method check regular expression is match with given parameter
    return checkPass.test(password)
  }
  // Password hidden feature
  const [type, setType] = useState(true)
  const [icon, setIcon] = useState(<NoEncryptionSharpIcon />)
  const handleToggle = () => {
    if (type === false) {
      setIcon(<NoEncryptionSharpIcon />)
      setType(true)
    } else {
      setIcon(<LockSharpIcon />)
      setType(false)
    }
  }

  return (
    <div className='vh-100'>
      <div className='container h-100'>
        <div className='row d-flex justify-content-center align-items-center h-100'>
          <div className='card text-black' style={{ borderRadius: '25px' }}>
            {/* helps to align an image */}
            <div className='card-body p-md-5'>
              <div className='row justify-content-center'>
                {/* adjusts all the input column sizes */}
                <div className='col-md-10 col-lg-10 col-xl-5 order-2'>
                  <p className='text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4'>
                    Sign Up
                  </p>
                  <form className='mx-1 mx-md-4'>
                    <div className='flex-fill mb-3'>
                      <label
                        htmlFor='firstname'
                        className='form-label'
                        id='firstname'
                      >
                        Your First Name<span className='text-danger'>*</span>
                      </label>
                      <input
                        type='text'
                        // aria-labelledby='firstname'
                        name='firstname'
                        className='form-control'
                        value={firstname}
                        onChange={(event) => setFirstname(event.target.value)}
                        placeholder='First Name'
                        onBlur={validateFirstname}
                        required
                      />
                      <small className='text-muted'>
                        First Character should be capital and not accepts
                        number.
                      </small>
                    </div>

                    <div className='flex-fill mb-3'>
                      <label
                        htmlFor='lastname'
                        className='form-label'
                        id='lastname'
                      >
                        Your Last Name <span className='text-danger'>*</span>
                      </label>
                      <input
                        type='text'
                        // aria-labelledby='lastname'
                        name='lastname'
                        className='form-control'
                        value={lastname}
                        onChange={(event) => setLastname(event.target.value)}
                        placeholder='Last Name'
                        onBlur={validateLastname}
                        required
                      />
                      <small className='text-muted'>
                        First Character should be capital and not accepts number
                      </small>
                    </div>

                    <div className='flex-fill mb-3'>
                      <label htmlFor='email' className='form-label' id='email'>
                        Email-Id <span className='text-danger'>*</span>
                      </label>
                      <input
                        type='email'
                        // aria-labelledby='email'
                        className='form-control'
                        name='email'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder='Email'
                        onBlur={validateEmail}
                        required
                      />
                      <small className='text-muted'>Enter Valid Email</small>
                    </div>

                    <div className='flex-fill mb-4'>
                      <i onClick={handleToggle} className='lock-password'>
                        <abbr
                          title='helps to change the password visibility'
                          style={{ cursor: 'pointer' }}
                        >
                          {icon}
                        </abbr>
                      </i>
                      <label
                        htmlFor='password'
                        className='form-label'
                        id='password'
                      >
                        Password <span className='text-danger'>*</span>
                      </label>
                      <input
                        type={type ? 'password' : 'text'}
                        // aria-labelledby='password'
                        name='password'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder='Password'
                        onBlur={validatePassword}
                        required
                      />

                      <small className='text-muted'>
                        Atleast One(UpperCase, LowerCase, Number & Special
                        Character) Minimum-length(8).
                      </small>
                    </div>

                    <p
                      className='text-center mb-3'
                      style={{ color: '#666864' }}
                    >
                      Dear User Your Data Is Safe With Us.
                    </p>

                    <div className='d-flex justify-content-center mx-4 mb-3 mb-lg-4'>
                      <button
                        type='submit'
                        className='btn btn-primary btn-lg'
                        onClick={handleSubmit}
                      >
                        Register
                      </button>
                    </div>

                    <p className='text-center'>
                      Already Register ?
                      <Link
                        to={'/login'}
                        style={{ textDecoration: 'none', color: 'green' }}
                      >
                        &nbsp;&nbsp;Click here to Log-In
                      </Link>
                    </p>
                  </form>
                </div>
                <div className='col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2'>
                  <img
                    src={Clipart}
                    alt='event management'
                    className='img-fluid'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Signup
