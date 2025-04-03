import { useContext } from 'react'
import React, { useState } from 'react'
import NoteContext from '../context/notes/NoteContext'

function AddNote() {
    const context = useContext(NoteContext)
    const { addNote } = context

    const [note, setNote] = useState({ title: "", description: "", tag: "default" })

    const handleclick = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className='container m-3'>
            <h1>Add note</h1>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" onChange={onChange} id="title" name='title' aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" onChange={onChange} id="description" name='description' />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" onChange={onChange} id="tag" name='tag' />
                </div>
               
                <button type="submit" className="btn btn-primary my-2" onClick={handleclick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
