import { useState } from "react";
import NoteContext from "./NoteContext.jsx";

const NoteState = (props) => {

    const host = "http://localhost:5000"
    const notesinitial = []
    const [notes, setNotes] = useState(notesinitial)

    //get notes
    const getNotes = async () => {

        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdlMTYxMDU3Y2MzNjQxODQ5N2JhYWRkIn0sImlhdCI6MTc0MjgyMzY4NX0.eP2kDMl9-CcPBAl1pTIIQPf9ZS9iCKPGBBerCLEQ6Ac"
            }
        });

        const json = await response.json()
        console.log(json)
        setNotes(json)
    }

    //Add note
    const addNote = async (title, description, tag) => {

        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdlMTYxMDU3Y2MzNjQxODQ5N2JhYWRkIn0sImlhdCI6MTc0MjgyMzY4NX0.eP2kDMl9-CcPBAl1pTIIQPf9ZS9iCKPGBBerCLEQ6Ac"
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const newNote = await response.json();
        setNotes(prevNotes => [...prevNotes, newNote]);
    }
    //delete Note
    const deleteNote =async (id) => {
        //api call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdlMTYxMDU3Y2MzNjQxODQ5N2JhYWRkIn0sImlhdCI6MTc0MjgyMzY4NX0.eP2kDMl9-CcPBAl1pTIIQPf9ZS9iCKPGBBerCLEQ6Ac"
            }
        });
        const json = response.json()
        console.log(json)

        console.log("delete note", id);
        const newNotes = notes.filter((note) => note._id !== id);
        setNotes(newNotes);
    };


    // edit Note
    const editNote = async (id, title, description, tag) => {
        //api fetch
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdlMTYxMDU3Y2MzNjQxODQ5N2JhYWRkIn0sImlhdCI6MTc0MjgyMzY4NX0.eP2kDMl9-CcPBAl1pTIIQPf9ZS9iCKPGBBerCLEQ6Ac"
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const json = response.json()
        let newNotes= JSON.parse(JSON.stringify(notes))
        // logic for edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                element.title = title
                element.description = description
                element.tag = tag
                break;
        }
            
        }
        setNotes(newNotes)
    }
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState