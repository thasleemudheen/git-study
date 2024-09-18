import React from 'react'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import UserSignupPage from '../../pages/SingupPage'
import UserLoginPage from '../../pages/UserLoginPage'
import HomePage from '../../pages/HomePage'
import UserDashBoard from '../../pages/UserDashBoard'
export default function UserRoute() {
  return (
    <div>
      <Router>
        <Routes>
            <Route path='/signup' element={<UserSignupPage/>}/>
            <Route path='/login' element={<UserLoginPage/>}/>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/dashboard' element={<UserDashBoard/>}/>
        </Routes>
      </Router>
    </div>
  )
}
