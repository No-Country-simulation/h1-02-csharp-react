import { create } from "zustand";



const useNoteStore = create((set) => ({
    openNote: false,
    notes: [],
    newNoteText: "",
    newNoteTitle: "",
    buttonRef: null,
    setButtonRef: (ref) => set({ buttonRef: ref }),
    setNewNoteText: (text) => set({ newNoteText: text }),
    setNewNoteTitle: (title) => set({ newNoteTitle: title }),
    setOpen: (open) => set({ openNote: open }),
    setNotes: (notes) => set({ notes }),
    addItem: (note) => set((state) => ({ notes: [...state.notes, note] })),
}));

export default useNoteStore;