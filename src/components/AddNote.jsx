import { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'

function AddNote() {
    const context = useContext(NoteContext)
    const { addNote } = context

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleClick = (e) => {
        e.preventDefault()
        if (note.title && note.description) {
            addNote(note.title, note.description, note.tag)
            setNote({ title: "", description: "", tag: "" }) // clear fields
        }
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const inputStyle = {
        borderRadius: '10px',
        border: '1px solid #ced4da',
        transition: 'all 0.3s ease-in-out',
        padding: '10px',
    }

    const hoverStyle = {
        boxShadow: '0 0 10px rgba(0, 123, 255, 0.3)',
        transform: 'scale(1.02)',
    }

    return (
        <div className='m-3'>
            <h2 className='text-primary mb-4'>Add a New Note</h2>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name='title'
                        value={note.title}
                        onChange={onChange}
                        style={inputStyle}
                        onMouseEnter={(e) => Object.assign(e.target.style, hoverStyle)}
                        onMouseLeave={(e) => Object.assign(e.target.style, inputStyle)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        name='description'
                        value={note.description}
                        onChange={onChange}
                        style={inputStyle}
                        onMouseEnter={(e) => Object.assign(e.target.style, hoverStyle)}
                        onMouseLeave={(e) => Object.assign(e.target.style, inputStyle)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input
                        type="text"
                        className="form-control"
                        id="tag"
                        name='tag'
                        value={note.tag}
                        onChange={onChange}
                        style={inputStyle}
                        onMouseEnter={(e) => Object.assign(e.target.style, hoverStyle)}
                        onMouseLeave={(e) => Object.assign(e.target.style, inputStyle)}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary my-2"
                    onClick={handleClick}
                    style={{
                        borderRadius: '10px',
                        transition: '0.2s ease-in-out',
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#0b5ed7'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#0d6efd'}
                >
                    Add Note
                </button>
            </form>
        </div>
    )
}

export default AddNote
