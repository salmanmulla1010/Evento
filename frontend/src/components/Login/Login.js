import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LockSharpIcon from '@mui/icons-material/LockSharp'
import NoEncryptionSharpIcon from '@mui/icons-material/NoEncryptionSharp'
import ClipArt from '../../css/Photos/ClipArt.jpg'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
  axios.defaults.withCredentials = true
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginSubmit = async (e) => {
    e.preventDefault()
    await axios
      .post('http://localhost:5000/login', {
        email,
        password,
      })
      .then((response) => {
        console.log('User Created---->', response.data)
        if (response.data.Status === 'Success') {
          localStorage.setItem('info', JSON.stringify(response.data))
          navigate('/')
          localStorage.setItem('user', true)
        } else {
          toast.error('invalid credentials', {
            position: 'top-center',
            theme: 'colored',
          })
        }
      })
  }
  // handle toggle do one component
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
                    Sign In
                  </p>
                  <form className='mx-1 mx-md-4'>
                    <div className='d-flex flex-row align-items-center mb-4'>
                      <div className='flex-fill mb-2'>
                        <label
                          htmlFor='email'
                          className='form-label'
                          id='email'
                        >
                          Email-Id :
                        </label>

                        <input
                          type='email'
                          name='email'
                          className='form-control'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder='Email'
                          id='email'
                          aria-labelledby='email'
                        />
                      </div>
                    </div>

                    <div className='d-flex flex-row align-items-center mb-4'>
                      <div className='flex-fill mb-2'>
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
                          Password :
                        </label>
                        <div className='password-input'>
                          <input
                            type={type ? 'password' : 'text'}
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Password'
                            className='form-control'
                            id='password'
                            aria-labelledby='password'
                          />
                        </div>
                      </div>
                    </div>

                    <p
                      className='text-center mb-5'
                      style={{ color: '#666864' }}
                    >
                      Dear User Your Data Is Safe With Us.
                    </p>

                    <div className='d-flex justify-content-center mx-4 mb-3 mb-lg-4'>
                      <button
                        type='submit'
                        className='btn btn-primary btn-lg'
                        onClick={loginSubmit}
                        disabled={password === ''}
                      >
                        Log In
                      </button>
                    </div>

                    <p className='text-center'>
                      Don't Have Your Account ?
                      <Link
                        to={'/register'}
                        style={{ textDecoration: 'none', color: 'green' }}
                      >
                        &nbsp;&nbsp;Click here to Register
                      </Link>
                    </p>
                  </form>
                </div>
                <div className='col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2'>
                  <img
                    src={ClipArt}
                    className='img-fluid'
                    alt='event management'
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

export default Login
