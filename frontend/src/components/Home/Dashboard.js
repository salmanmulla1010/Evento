import React from 'react'
import EventTable from '../EventTable/EventTable'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <Link to='/addevent' className='AddEvent'>
        Add Event
      </Link>
      <EventTable />
    </div>
  )
}

export default Dashboard
