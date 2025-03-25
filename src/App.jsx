import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import NoteState from './context/notes/NoteState.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
          </Routes>

        </Router>
      </NoteState>
    </>
  )
}

export default App
