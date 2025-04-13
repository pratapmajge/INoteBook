import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import NoteState from './context/notes/NoteState.jsx'
import Alert from './components/Alert.jsx'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'

function App() {
  const [alert , setAlert]= useState(null)
  const showalert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }
  return (
    <>
      <NoteState>
        
          <Router>
            <Navbar />
            <Alert alert={alert}/>
            <div className="container">
            <Routes>
              <Route path='/' element={<Home showalert={showalert}/>} />
              <Route path='/about' element={<About />} />
              <Route path='/login' element={<Login showalert={showalert} />} />
              <Route path='/signup' element={<Signup showalert={showalert}/>} />
            </Routes>
            </div>
          </Router>
       
      </NoteState>
    </>
  )
}

export default App
