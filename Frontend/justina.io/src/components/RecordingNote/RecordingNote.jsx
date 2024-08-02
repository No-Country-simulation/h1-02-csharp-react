import { useRef } from "react";
import RecordingButton from "../RecordingButton/RecordingButton";

const RecordingNotes = () => {
  const ref = useRef();
  return (
    <div
      ref={ref}
      className="fixed bottom-[1.5%] right-[1%] rounded-2xl bg-[#fafafa]"
    >
      <div className="p-3 w-80 ">
        <div className="flex justify-between items-center mb-3">
          <span className="text-primary font-bold text-xl">Title</span>
          <RecordingButton />
        </div>
        <textarea
          placeholder="Note..."
          className="outline outline-primary w-full resize-none border-none outline-1 rounded-lg p-2 min-h-24"
        />
        <div className="flex justify-between items-center mt-3">
          <button
            className="text-primary shadow-custom rounded-[32px] w-32 h-8"
            onClick={() => alert("Editar")}
          >
            Editar
          </button>
          <button
            className="text-white bg-primary rounded-[32px] w-32 h-8"
            onClick={() => alert("Guardar")}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordingNotes;
