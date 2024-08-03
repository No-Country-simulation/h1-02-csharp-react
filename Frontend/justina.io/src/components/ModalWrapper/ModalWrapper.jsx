import { useEffect } from "react";
import Show from "../Show/Show";
import { useCallback } from "react";

const ModalWrapper = ({ open, onClose, children, className }) => {
  const handleClose = useCallback(
    (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        onClose && onClose();
      }
    },
    [onClose]
  );
  useEffect(() => {
    window.addEventListener("keydown", handleClose);
    return () => window.removeEventListener("keydown", handleClose);
  }, []);

  return (
    <Show when={open}>
      <div
        onDoubleClick={handleClose}
        className="fixed inset-0 w-full h-full flex items-start justify-center z-50 bg-rose-o40"
      >
        <article
          className={`relative flex flex-col my-auto opacity-0 animation-enter min-w-[330px] bg-[#fafafa]/10 shadow-glass-effect rounded-[32px] overflow-hidden text-neutrals600 p-4 ${className}`}
        >
          {children}
        </article>
      </div>
    </Show>
  );
};

export default ModalWrapper;
