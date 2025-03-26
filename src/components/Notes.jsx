import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem'


function Notes() {
    const context = useContext(NoteContext)
    const { notes, setNotes } = context
    return (
        <div className='row m-3'>
            <h1>view note</h1>
            {notes.map((note) => {
                return <NoteItem key={note._id} note={note} />
            })}
        </div>
    )
}

export default Notes
