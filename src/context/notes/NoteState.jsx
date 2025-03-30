import { useState } from "react";
import NoteContext from "./NoteContext.jsx";

const NoteState = (props) => {

    const notesinitial = [
        {
            "_id": "67e1619d7cc36418497baae2",
            "user": "67e161057cc36418497baadd",
            "title": "Akshay Title",
            "description": "this is first note of user2",
            "tag": "personal",
            "date": "2025-03-24T13:43:57.499Z",
            "__v": 0
        },
        {
            "_id": "67e161766229d7cc36418497baae2",
            "user": "67e161057cc36418497baadd",
            "title": "Akshay Title",
            "description": "this is first note of user2",
            "tag": "personal",
            "date": "2025-03-24T13:43:57.499Z",
            "__v": 0
        },
        {
            "_id": "67e161733669d7cc36418497baae2",
            "user": "67e161057cc36418497baadd",
            "title": "Akshay Title",
            "description": "this is first note of user2",
            "tag": "personal",
            "date": "2025-03-24T13:43:57.499Z",
            "__v": 0
        }
    ]
    const [notes, setNotes] = useState(notesinitial)

    //Add note
    const addNote = (title, description, tag) => {
        const note = {
            "_id": "67e1617669d7cc36418497baae2",
            "user": "67e161057cc36418497baadd45",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2025-03-24T13:43:57.499Z",
            "__v": 0
        }
        setNotes(notes.concat(note))
    }
    //delete Note
    const deleteNote = () => {

    }
    // edit Note
    const editNote = () => {

    }
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState