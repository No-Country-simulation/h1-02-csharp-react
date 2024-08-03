import { useRef } from "react";
import RecordingButton from "../RecordingButton/RecordingButton";
import useNoteStore from "../../store/useNoteStore";
import useClickOutside from "../../hooks/useClickOutside";
import Show from "../Show/Show";
import useNotes from "../../hooks/useNotes";

const RecordingNotes = () => {
  const { addNote } = useNotes();
  const {
    openNote,
    setOpen,
    setNewNoteText,
    setNewNoteTitle,
    newNoteText,
    newNoteTitle,
    buttonRef,
    addItem,
  } = useNoteStore();
  const handleClose = () => {
    if (openNote) {
      setOpen(false);
    }
  };
  const ref = useRef();
  useClickOutside(ref, handleClose, buttonRef);

  const handleSave = () => {
    addNote(newNoteText, newNoteTitle).then((res) => {
      if (res.data) {
        setOpen(false);
        addItem({
          id: crypto.randomUUID(),
          description: newNoteText,
          title: newNoteTitle,
        });
        setNewNoteTitle("");
        setNewNoteText("");
      }
    });
  };
  return (
    <div
      ref={ref}
      className={`fixed bottom-[1.5%] right-[1%] rounded-2xl transition-all duration-300 ${
        openNote
          ? "bg-[#fafafa] opacity-100"
          : "bg-transparent select-none opacity-0"
      }`}
    >
      <Show when={openNote}>
        <div className="p-3 w-80 ">
          <div className="flex justify-between items-center mb-3">
            <input
              type="text"
              className="text-primary font-bold text-xl bg-transparent outline-none border-none"
              defaultValue="Title"
              onChange={(e) => setNewNoteTitle(e.target.value)}
            />
            <RecordingButton setNewNoteText={(val) => setNewNoteText(val)} />
          </div>
          <textarea
            placeholder="Note..."
            className="outline outline-primary w-full resize-none border-none outline-1 rounded-lg p-2 min-h-24"
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
          />
          <div className="flex justify-between items-center mt-3">
            <button
              className="text-white bg-primary rounded-[32px] w-32 h-8 ml-auto"
              onClick={handleSave}
            >
              Guardar
            </button>
          </div>
        </div>
      </Show>
    </div>
  );
};

export default RecordingNotes;
