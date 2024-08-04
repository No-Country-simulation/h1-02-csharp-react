import NoteTextarea from "./NoteTextarea";
import useHandleDeleteNote from "../../hooks/useHandleDeleteNote";

export default function NoteComponent({ title, desc, id }) {
  const { handleDeleteNote } = useHandleDeleteNote();
  const handleDelete = () => {
    handleDeleteNote(id);
  };
  return (
    <div
      className={
        "rounded-2xl max-w-[400px] h-[175px] p-1 odd:bg-rose-o60 even:bg-indigo-300 pb-6"
      }
    >
      <div className="flex justify-between px-4">
        <input
          className="text-primary font-bold text-xl bg-transparent outline-none border-none max-w-[75%]"
          defaultValue={title || "No title"}
          disabled
        />
        <div>
          <button
            className="text-error-200 rounded-full p-1 bg-rose-o40 w-8 font-bold"
            onClick={handleDelete}
          >
            X
          </button>
        </div>
      </div>
      <NoteTextarea desc={desc} />
    </div>
  );
}
