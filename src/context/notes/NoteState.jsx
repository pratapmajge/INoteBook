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
            "_id": "67e1619d7cc36418497baae2",
            "user": "67e161057cc36418497baadd",
            "title": "Akshay Title",
            "description": "this is first note of user2",
            "tag": "personal",
            "date": "2025-03-24T13:43:57.499Z",
            "__v": 0
        }
    ]
    const [notes, setNotes] = useState(notesinitial)
    return (
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState