import NoteTextarea from "./NoteTextarea";
import useHandleDeleteNote from "../../hooks/useHandleDeleteNote";
import { CrossIcon } from "../icons";
import { memo } from "react";
import { useMemo } from "react";
import useConfirmStore from "../../store/useConfirmStore";

function getRandomClass() {
  const classes = [
    "even:bg-purple-o40 odd:bg-green-o40",
    "even:bg-white/40 odd:bg-primary-o40",
  ];
  const randomIndex = Math.floor(Math.random() * classes.length);
  const second = randomIndex === 0 ? 1 : 0;

  return [classes[randomIndex], classes[second]];
}

const MemoizedNoteComponent = memo(
  function NoteComponent({ title, desc, id, i = 0 }) {
    const { handleDeleteNote } = useHandleDeleteNote();
    const { setModalType, setOnConfirm, setOpen } = useConfirmStore();

    const handleDelete = () => {
      setModalType("ModalRemoveNote");
      setOpen(true);
      setOnConfirm(() => {
        handleDeleteNote(id);
        setOpen(false);
      });
    };
    const classess = useMemo(() => getRandomClass(), []);
    return (
      <div
        className={`shadow-glass-effect rounded-2xl max-w-[400px] h-[175px] p-1 pb-6 ${
          i % 2 === 0 ? classess[0] : classess[1]
        }`}
      >
        <div className="flex justify-between pl-4 pr-2">
          <input
            className="text-primary font-bold text-xl bg-transparent outline-none border-none max-w-[75%]"
            defaultValue={title || "No title"}
            disabled
          />
          <div>
            <button
              className="text-error-200 rounded-full p-1 bg-white/60 w-8 font-bold scale-[0.9] outline-none border-none focus:outline-none"
              onClick={handleDelete}
            >
              <CrossIcon />
            </button>
          </div>
        </div>
        <NoteTextarea desc={desc} />
      </div>
    );
  },
  (prev, next) => prev.id
);

export default MemoizedNoteComponent;
