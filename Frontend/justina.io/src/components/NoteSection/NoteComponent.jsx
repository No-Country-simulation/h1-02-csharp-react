import NoteTextarea from "./NoteTextarea";

export default function NoteComponent({ title, desc }) {
  return (
    <div
      className={
        "rounded-2xl max-w-[400px] p-1 h-fit odd:bg-rose-o60 even:bg-indigo-300"
      }
    >
      <div className="flex justify-between px-2">
        <input
          className="text-primary font-bold text-xl bg-transparent outline-none border-none max-w-[75%]"
          defaultValue={title || "No title"}
          disabled
        />
        <div>
          <button className="text-error-200 rounded-full p-1 bg-rose-o40 w-8 font-bold">
            X
          </button>
        </div>
      </div>
      <NoteTextarea desc={desc} />
    </div>
  );
}
