import NoteTextarea from "./NoteTextarea";
import useHandleDeleteNote from "../../hooks/useHandleDeleteNote";

function getRandomClass() {
  const classes = [
    "even:bg-purple-o40 odd:bg-green-o40",
    "even:bg-white/40 odd:bg-primary-o40",
  ];
  const randomIndex = Math.floor(Math.random() * classes.length);
  const second = randomIndex === 0 ? 1 : 0;

  return [classes[randomIndex], classes[second]];
}

export default function NoteComponent({ title, desc, id, i = 0 }) {
  const { handleDeleteNote } = useHandleDeleteNote();

  const handleDelete = () => {
    handleDeleteNote(id);
  };
  const classess = getRandomClass();
  return (
    <div
      className={`shadow-glass-effect rounded-2xl max-w-[400px] h-[175px] p-1 pb-6 ${
        i % 2 === 0 ? classess[0] : classess[1]
      }`}
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
