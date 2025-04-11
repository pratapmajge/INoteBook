import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import NoteState from './context/notes/NoteState.jsx'
import Alert from './components/Alert.jsx'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'


function App() {

  return (
    <>
      <NoteState>
        
          <Router>
            <Navbar />
            <Alert message='This is alert'/>
            <div className="container">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
            </Routes>
            </div>
          </Router>
       
      </NoteState>
    </>
  )
}

export default App
