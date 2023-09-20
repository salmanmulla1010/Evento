import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import '../../css/Style/Style.css'
import '../../css/AddEvent/addevent.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import moment from 'moment'
import axios from 'axios'

const UpdateEvent = () => {
  const navigate = useNavigate()
  const [ename, setEname] = useState('')
  const [edescription, setEdesc] = useState('')
  const [edatetime, setedatetime] = useState(null)
  const [evenue, setEvenue] = useState('')
  const { id } = useParams()

  const handledatetime = (date) => {
    setedatetime(date)
  }

  useEffect(() => {
    async function fetchData() {
      await axios
        .get('http://localhost:5000/addevent/' + id)
        .then((res) => {
          setEname(res.data.ename)
          setEdesc(res.data.edescription)
          console.log('Fetach Date Format', res.data.edatetime)
          setedatetime(new Date(res.data.edatetime))
          setEvenue(res.data.evenue)
        })
        .catch((err) => {
          console.log('Axios Error-->', err)
        })
    }
    fetchData()
  }, [id])

  const formSubmit = (e) => {
    const dateformat = moment(edatetime).format('YYYY-MM-DD,HH:mm:ss')
    e.preventDefault()
    try {
      axios
        .patch('http://localhost:5000/updateevent/' + id, {
          ename,
          edescription,
          edatetime: dateformat,
          evenue,
        })
        .then((response) => {
          console.log('Add Data------>', response)
          response.send('Data Sended.')
        })
      navigate('/')
    } catch (error) {
      console.log(' Axios Error------>', error)
    }
  }
  return (
    <div>
      <Navbar />
      <div className='event-form'>
        <h2>Update Event</h2>
        <form onSubmit={formSubmit}>
          <label htmlFor='ename' className='lable-form'>
            Evant Name :
          </label>
          <input
            type='text'
            name='ename'
            value={ename}
            onChange={(e) => setEname(e.target.value)}
            placeholder='Event Name'
            className='ename'
          />
          <label htmlFor='edescription' className='lable-form'>
            Evant Description :
          </label>
          <textarea
            name='eDesc'
            rows='5'
            cols='33'
            value={edescription}
            onChange={(e) => setEdesc(e.target.value)}
            placeholder='Event Description'
            className='edescription'
          />
          <div>
            <label htmlFor='edatetime' className='lable-form'>
              Evant Date & Time:
            </label>
            <DatePicker
              selected={edatetime}
              onChange={handledatetime}
              showTimeSelect
              dateFormat='MMMM d, yyyy h:mm a'
              className='edatetime'
            />
          </div>
          <label htmlFor='evenue' className='lable-form'>
            Evant Venue :
          </label>
          <input
            type='text'
            name='evenue'
            value={evenue}
            onChange={(e) => setEvenue(e.target.value)}
            placeholder='Event Venue'
            className='evenue'
          />
          <button className='updateEvent  update-button'>Update</button>
          <Link to={'/'} className='backButton'>
            ~Back
          </Link>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default UpdateEvent
