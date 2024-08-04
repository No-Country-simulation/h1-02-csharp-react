import api from "../api/axios";
import useNoteStore from "../store/useNoteStore";

 const useHandleDeleteNote = ()=>{
    const {removeItem} = useNoteStore();
    const handleDeleteNote = (noteId)=>{
        api.delete(`/api/Note/DeleteNote/${noteId}`).then((value) => {
            removeItem(noteId);
        });
    }

    return {handleDeleteNote};
}

export default useHandleDeleteNote;