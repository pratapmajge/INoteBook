import { useState } from "react";
import NoteContext from "./NoteContext.jsx";

const NoteState = (props) => {

    const host = "http://localhost:5000"
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
            "_id": "67e161766229d7cc36418497b0op2",
            "user": "67e161057cc36418497baadd",
            "title": "Akshay Title",
            "description": "this is first note of user2",
            "tag": "personal",
            "date": "2025-03-24T13:43:57.499Z",
            "__v": 0
        },
        {
            "_id": "67e161733669d7cc36418497bkxle2",
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
    const addNote = async (title, description, tag) => {

        const response = await fetch(`${host}api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdlMTYxMDU3Y2MzNjQxODQ5N2JhYWRkIn0sImlhdCI6MTc0MjgyMzY4NX0.eP2kDMl9-CcPBAl1pTIIQPf9ZS9iCKPGBBerCLEQ6Ac"
            },
            body: JSON.stringify({title,description,tag}),
        });

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
    const deleteNote = (id) => {
        console.log("delete note", id);
        const newNotes = notes.filter((note) => note._id !== id);
        setNotes(newNotes);
    };


    // edit Note
    const editNote = async (id, title, description, tag) => {
        //api fetch
        const response = await fetch(`${host}api/notes/updatenote/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdlMTYxMDU3Y2MzNjQxODQ5N2JhYWRkIn0sImlhdCI6MTc0MjgyMzY4NX0.eP2kDMl9-CcPBAl1pTIIQPf9ZS9iCKPGBBerCLEQ6Ac"
            },
            body: JSON.stringify({title,description,tag}),
        });
        const json = response.json()
        // logic for edit in client
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title
                element.description = description
                element.tag = tag
            }

        }
    }
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState