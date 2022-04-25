import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './views/layout/index'
import Login from '@/views/login/index'
import React from 'react'
import './App.css'
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route index element={<Layout />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
