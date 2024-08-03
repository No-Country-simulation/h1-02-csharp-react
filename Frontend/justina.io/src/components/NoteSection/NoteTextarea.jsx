import { useRef } from "react";
import useAutoResizeTextarea from "../../hooks/useAutorezieTextarea";

export default function NoteTextarea({ desc }) {
  const ref = useRef();
  useAutoResizeTextarea(ref, desc);
  return (
    <textarea
      ref={ref}
      className="text-neutrals800 outline-none border-none bg-transparent resize-none p-4 w-full h-auto font-medium"
      defaultValue={desc}
      disabled
    />
  );
}
