import { useCallback } from "react";
import useConfirmStore from "../../store/useConfirmStore";
import ModalWrapper from "../ModalWrapper/ModalWrapper";

const ConfirmModal = ({ message, currentType }) => {
  const { open, setOpen, modalType, onConfirm } = useConfirmStore();
  const onClose = useCallback(() => setOpen(false), []);
  return (
    <ModalWrapper
      open={open && modalType === currentType}
      onClose={onClose}
      className={"max-w-[500px] backdrop-blur-sm"}
    >
      <div className="flex flex-col justify-center items-center w-full">
        <p className="p-2 text-neutrals800 font-medium">{message}</p>
        <div className="flex justify-between items-center p-2 gap-x-6">
          <button
            onClick={onClose}
            className="shadow-glass-effect rounded-2xl font-bold py-2 px-5 h-[40px] flex justify-center items-center text-primary bg-white/40 outline-none border-none focus:outline-none"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="shadow-glass-effect rounded-2xl font-bold py-2 px-5 h-[40px] flex justify-center items-center text-white bg-primary outline-none border-none focus:outline-none"
          >
            Confirmar
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ConfirmModal;
