import { useRef } from "react";
import useNoteStore from "../../store/useNoteStore";
import { useEffect } from "react";
import api from "../../api/axios";
import NoteComponent from "./NoteComponent";

const fetch = async () => {
  return api.get("/api/Note/GetAllNotes").then((notes) => {
    return notes.data;
  });
};

export default function NoteSection() {
  const { setOpen, setButtonRef, openNote, setNotes, notes } = useNoteStore();
  const ref = useRef();

  useEffect(() => {
    setButtonRef(ref);
    if (notes.length === 0) {
      fetch().then((notes) => setNotes(notes));
    }
  }, [ref]);
  return (
    <section>
      <div className="flex justify-between text-primary font-bold">
        <h2 className="text-titulopag">Tus Notas</h2>
        <button
          ref={ref}
          className="rounded-[32px] bg-rose-o20 shadow-glass-effect p-2"
          onClick={() => setOpen(!openNote)}
        >
          Crear Nueva Nota +
        </button>
      </div>
      <div className="w-full grid grid-cols-2 gap-8 pt-4">
        {notes.map((note) => (
          <NoteComponent
            key={note.id}
            title={note.title}
            desc={note.description}
          />
        ))}
      </div>
    </section>
  );
}
