import React from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios'
import Footer from '../Footer/Footer'
import Dashboard from './Dashboard'
import '../../css/Home/home.css'
const Home = () => {
  axios.defaults.withCredentials = true
  return (
    <>
      <div className='home'>
        <Navbar />
        <Dashboard />
        <Footer />
      </div>
    </>
  )
}

export default Home
