import { useRef } from "react";

export default function NoteTextarea({ desc }) {
  const ref = useRef();
  //useAutoResizeTextarea(ref, desc);
  return (
    <textarea
      ref={ref}
      className="text-neutrals800 outline-none border-none bg-transparent resize-none p-4 w-full font-medium h-[80%] scrollbar-style rose"
      defaultValue={desc}
      disabled
    />
  );
}
