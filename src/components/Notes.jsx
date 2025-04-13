import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'


function Notes(props) {
    const context = useContext(NoteContext);
    const { notes, getNotes, editNote } = context;

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
    const ref = useRef(null);
    const refClose = useRef(null)

    useEffect(() => {
        getNotes();
    }, []);

    const updateNote = (currentNote) => {
        setNote({
            id: currentNote._id,
            etitle: currentNote.title,
            edescription: currentNote.description,
            etag: currentNote.tag
        });
        ref.current.click();
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    const handleClick = (e) => {
        // e.preventDefault();
        console.log("Updated note:", note);
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click()
        props.showalert("Note updated successfully" , "success")
        // Call context method to update note here
    };

    return (
        <>
        <AddNote showalert={props.showalert}/>
            <button
                type="button"
                ref={ref}
                className="btn btn-primary d-none"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
            >
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="etitle"
                                        name="etitle"
                                        value={note.etitle}
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="edescription"
                                        name="edescription"
                                        value={note.edescription}
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="etag"
                                        name="etag"
                                        value={note.etag}
                                        onChange={onChange}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row m-3">
                <h1>View Notes</h1>
                <div className="container">
                    {notes.length === 0 && 'No notes to display'}
                </div>
                {notes.map((note) => (
                    <NoteItem key={note._id} updateNote={updateNote} showalert={props.showalert} note={note} />
                ))}
            </div>
        </>
    );
}

export default Notes;
