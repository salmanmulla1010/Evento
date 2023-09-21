import React from 'react'
import EventTable from '../EventTable/EventTable'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <div className='end-wrapper'>
        <Link to='/addevent' className='AddEvent'>
          Add Event
        </Link>
      </div>
      <EventTable />
    </div>
  )
}

export default Dashboard
