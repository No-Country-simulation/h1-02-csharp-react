import { useCallback } from "react";
import handleDeleteDoctor from "../../hooks/handleDeleteDoctor";
import useConfirmStore from "../../store/useConfirmStore";
import useDoctorStore from "../../store/useDoctorStore";
import { CrossIcon } from "../icons";
import { toast } from "react-toastify";

const RemoveDoctorButton = ({ id }) => {
  const { removeId, doctors } = useDoctorStore();
  const { setOnConfirm, setModalType, setOpen } = useConfirmStore();
  const handleDeleted = useCallback(() => {
    const toastId = toast.loading("Eliminando...");
    handleDeleteDoctor(id).then((res) => {
      if (res) {
        toast.done(toastId);
        removeId(id);
        toast.success("Se ha eliminado el medico.");
      } else {
        toast.error("Ha ocurrido un error");
      }
      setOpen(false);
    });
  }, [id, doctors, removeId]);
  const onRemove = () => {
    setModalType("RemoveDoctor");
    setOpen(true);
    setOnConfirm(handleDeleted);
  };

  return (
    <span className="w-full flex justify-center items-center">
      <button
        onClick={onRemove}
        className="p-1 w-[2.115rem] rounded-full bg-rose-o60 transition-all font-semibold hover:font-bold text-neutrals800 hover:text-error-200"
      >
        <CrossIcon />
      </button>
    </span>
  );
};

export default RemoveDoctorButton;
