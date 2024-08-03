import api from "../api/axios"

const useNotes = ()=>{
    const addNote = async (text, title)=>{
        return await api.post("/api/Note/AddNote", {text, description:title});
    }

    return {addNote}
}

export default useNotes;