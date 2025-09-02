

import { useState } from 'react'
import './App.css'
import AddSchool from './components/AddSchool'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ShowSchools from './components/ShowSchools'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AddSchool />} />
        <Route path="/showschools" element={<ShowSchools />} />
      </Routes> 
    </BrowserRouter>
  )
}

export default App
