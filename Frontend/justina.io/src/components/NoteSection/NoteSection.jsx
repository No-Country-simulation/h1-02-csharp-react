import { useRef } from "react";
import useNoteStore from "../../store/useNoteStore";
import { useEffect } from "react";
import api from "../../api/axios";
import NoteComponent from "../NoteComponent/NoteComponent";
import { PlusIcon } from "../icons";

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
    <section className="w-full flex flex-col gap-y-4 justify-start mt-10 max-w-[790px]">
      <div className="flex justify-between text-primary font-bold">
        <h2 className="text-titulopag">Tus Notas</h2>
        <button
          ref={ref}
          className="rounded-[32px] bg-rose-o20 shadow-glass-effect p-2 flex justify-center items-center gap-x-2"
          onClick={() => setOpen(!openNote)}
        >
          Crear Nueva Nota{" "}
          <span className="scale-[1] bg-rose-o40 rounded-md p-1">
            <PlusIcon />
          </span>
        </button>
      </div>
      <div className="w-full grid grid-cols-2 gap-8 transition-all duration-200">
        {notes.map((note) => {
          return (
            <NoteComponent
              key={note.id}
              title={note.title}
              desc={note.description}
              id={note.id}
            />
          );
        })}
      </div>
    </section>
  );
}
