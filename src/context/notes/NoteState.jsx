import NoteContext from "./NoteContext.jsx";

const NoteState =(props)=>{
    const state={
        "name":"Pratap",
        "class":"comp"
    }
    return(
        <NoteContext.Provider value={state}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState