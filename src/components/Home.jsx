import React, { useContext } from 'react'
import Notes from './Notes'
import AddNote from './AddNote'

function Home(props) {
  const {showalert} = props
  return (
    <div>
      <Notes showalert={showalert}/>
    </div>
  )
}

export default Home
