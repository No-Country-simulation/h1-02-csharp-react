import { create } from "zustand";



const useNoteStore = create((set) => ({
    openNote: true,
    notes: [],
    newNoteText: "",
    newNoteTitle: "",
    setNewNoteText: (text) => set({ newNoteText: text }),
    setNewNoteTitle: (title) => set({ newNoteTitle: title }),
    setOpen: (open) => set({ openNote: open }),
    setNotes: (notes) => set({ notes }),
}));

export default useNoteStore;