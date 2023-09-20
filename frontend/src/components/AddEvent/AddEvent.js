import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import moment from 'moment'
import axios from 'axios'
import '../../css/AddEvent/addevent.css'

const AddEvent = () => {
  const [ename, setEname] = useState('')
  const [edescription, setEdesc] = useState('')
  const [edatetime, setedatetime] = useState(null)
  const [evenue, setEvenue] = useState('')
  const navigate = useNavigate()

  const handledatetime = (date) => {
    console.log('Date Format', date)
    setedatetime(date)
  }

  const formSubmit = (e) => {
    const dateformat = moment(edatetime).format('yyyy-MM-DD,hh:mm:ss')
    e.preventDefault()
    try {
      axios
        .post('http://localhost:5000/addevent', {
          ename,
          edescription,
          edatetime: dateformat,
          evenue,
        })
        .then((resolve) => {
          console.log('Add Data------>', resolve)

          resolve.send('Data Sended')
        })
      navigate('/')
    } catch (err) {
      console.log('Error------>', err)
      navigate('/addvent')
    }
  }

  return (
    <div>
      <Navbar />

      <div className='event-form'>
        <h2>Create Event</h2>
        <form onSubmit={formSubmit}>
          <label htmlFor='ename' className='lable-form'>
            Event Name :
          </label>
          <input
            type='text'
            required
            name='ename'
            value={ename}
            onChange={(e) => setEname(e.target.value)}
            placeholder='Event Name'
            className='ename'
          />
          <label htmlFor='edescription' className='lable-form'>
            Event Description :
          </label>
          <textarea
            name='eDesc'
            rows='5'
            cols='33'
            required
            value={edescription}
            onChange={(e) => setEdesc(e.target.value)}
            placeholder='Event Description'
            className='edescription'
          />
          <div>
            <label htmlFor='edatetime' className='lable-form'>
              Event Date & Time:
            </label>
            <DatePicker
              placeholderText='Event Date & Time'
              selected={edatetime}
              onChange={handledatetime}
              showTimeSelect
              required
              dateFormat='MMMM d, yyyy h:mm a'
              className='edatetime'
            />
          </div>
          <label htmlFor='evenue' className='lable-form'>
            Event Venue :
          </label>
          <input
            type='text'
            required
            name='evenue'
            value={evenue}
            onChange={(e) => setEvenue(e.target.value)}
            placeholder='Event Venue'
            className='evenue'
          />
          <button type='submit' className='addSubmit'>
            Please Submit
          </button>
          <Link to={'/'} className='backButton'>
            ~Back
          </Link>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default AddEvent
