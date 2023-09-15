import axios from 'axios'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import '../../css/EventTable/eventTable.css'

const EventTable = () => {
  const [event, setEvent] = useState([])
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/addevent')
      setEvent(response.data)
    } catch (error) {
      console.log('Error fetching data:', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      console.log('Deleted id ', id)
      await axios
        .delete(`http://localhost:5000/addevent/${id}`)
        .then(setEvent(event.filter((events) => events.id !== id)))
    } catch (err) {
      console.log('Error occurred while deleting', err)
    }
  }

  return (
    <div>
      <div className='table-container'>
        <table>
          <thead>
            <tr className='actions'>
              <th>Event Name</th>
              <th>Event Description</th>
              <th>Event Date and Time</th>
              <th>Event Venue</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {event &&
              event
                .sort((a, b) => (a.edatetime > b.edatetime ? 1 : -1))
                .map((data, index) => (
                  <tr key={index}>
                    <td>{data.ename}</td>
                    <td>{data.edescription}</td>
                    <td>
                      {moment(data.edatetime).format('yyyy-MM-DD hh:mm:ss')}
                    </td>
                    <td>{data.evenue}</td>
                    <td>
                      <Link
                        to={`/updateevent/${data.id}`}
                        className='updateEvent actions'
                      >
                        Update
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={'/'}
                        onClick={() => handleDelete(data.id)}
                        className='deleteEvent actions'
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EventTable
