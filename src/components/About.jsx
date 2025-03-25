import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext.jsx'

function About() {
  const a = useContext(NoteContext)
  return (
    <div>
      this is about {a.name}
    </div>
  )
}

export default About
