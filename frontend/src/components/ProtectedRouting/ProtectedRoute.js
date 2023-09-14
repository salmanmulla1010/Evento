import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const keyTrue = localStorage.getItem('user')
  return keyTrue ? <Outlet /> : <Navigate to={'/register'} />
}
export default ProtectedRoute
