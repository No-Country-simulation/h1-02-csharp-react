import { useRef } from "react";
import useNoteStore from "../../store/useNoteStore";
import { useEffect } from "react";

export default function NoteSection() {
  const { setOpen, setButtonRef, openNote } = useNoteStore();
  const ref = useRef();

  useEffect(() => {
    setButtonRef(ref);
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
        <div className="rounded-2xl bg-rose-o60 max-w-[300px]">
          <div className="flex justify-between px-2">
            <input
              className="text-primary font-bold text-xl bg-transparent outline-none border-none max-w-[75%]"
              defaultValue={"Title"}
              disabled
            />
            <div>
              <button className="text-error-200 rounded-full p-1 bg-rose-o40 w-8">
                X
              </button>
            </div>
          </div>
          <textarea
            className="text-neutrals600 outline-none border-none bg-transparent resize-none p-4"
            defaultValue={"Probando nota"}
            disabled
          />
        </div>
      </div>
    </section>
  );
}
