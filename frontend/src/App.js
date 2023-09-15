import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import Profile from './components/Profile/Profile'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import ProtectedRoute from './components/ProtectedRouting/ProtectedRoute'
import AddEvent from './components/AddEvent/AddEvent'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import UpdateEvent from './components/UpdateEvent/UpdateEvent'

function App() {
  const loggedIn = localStorage.getItem('isLoggedIn')
  console.log('Logged In User--', loggedIn)
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/addevent' element={<AddEvent />} />
          <Route path='/updateevent/:id' element={<UpdateEvent />} />
        </Route>
        <Route path='/login' element={loggedIn ? <Home /> : <Login />} />
        <Route path='/register' element={loggedIn ? <Home /> : <Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
