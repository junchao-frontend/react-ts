import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './views/layout/index'
import Login from '@/views/login/index'
import AuthComponent from './components/authComponent'
import Home from './views/home'
import Article from './views/article'
import Publish from './views/publish'
import React from 'react'
import './App.css'
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <AuthComponent>
                <Layout />
              </AuthComponent>
            }>
            <Route index element={<Home />}></Route>
            <Route path="/article" element={<Article />}></Route>
            <Route path="/publish" element={<Publish />}></Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
