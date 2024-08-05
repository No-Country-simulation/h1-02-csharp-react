import { useEffect } from "react";
import Show from "../Show/Show";
import { useCallback } from "react";
import { CrossIcon } from "../icons";

const ModalWrapper = ({
  open,
  onClose,
  children,
  className,
  addCrossClose,
}) => {
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
        onDoubleClick={onClose}
        className="fixed inset-0 w-full h-full flex items-start justify-center z-50 bg-black/35 backdrop-blur-sm"
      >
        <article
          className={`relative flex flex-col my-auto opacity-0 animation-enter min-w-[330px] bg-[#fafafa] shadow-glass-effect rounded-[32px] overflow-hidden text-neutrals800 p-4 ${className}`}
        >
          <Show when={addCrossClose}>
            <button
              onClick={onClose}
              className="absolute top-2 right-[2.5%] rounded-full p-1 bg-transparent outline-none focus:outline-none border-none text-neutrals900"
            >
              <CrossIcon />
            </button>
          </Show>
          {children}
        </article>
      </div>
    </Show>
  );
};

export default ModalWrapper;
