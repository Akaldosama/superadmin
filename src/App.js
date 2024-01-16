import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Auth from './Auth'
import Admin from './Admin'
import SuperAdmin from './SuperAdmin'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Auth />}></Route>
        <Route path='admin' element={<Admin />}></Route>
        <Route path='super_admin' element={<SuperAdmin />}></Route>
      </Routes>
    </div>
  )
}
