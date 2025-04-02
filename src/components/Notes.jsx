import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem'
import AddNote from './AddNote'


function Notes() {
    const context = useContext(NoteContext)
    const { notes , getNotes } = context
    useEffect(()=>{
        getNotes()
    },[])
    return (
        <>
        <AddNote/>
        <div className='row m-3'>
            <h1>view note</h1>
            {notes.map((note) => {
                return <NoteItem key={note._id} note={note} />
            })}
        </div>
        </>
    )
}

export default Notes
