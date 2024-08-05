import { useCallback } from "react";
import handleDeleteDoctor from "../../hooks/useHandleDeleteDoctor";
import useConfirmStore from "../../store/useConfirmStore";
import useDoctorStore from "../../store/useDoctorStore";
import { CrossIcon } from "../icons";

const RemoveDoctorButton = ({ id }) => {
  const { removeId, doctors } = useDoctorStore();
  const { setOnConfirm, setModalType, setOpen } = useConfirmStore();
  const handleDeleted = useCallback(
    () =>
      handleDeleteDoctor(id).then((res) => {
        if (res) {
          removeId(id);
        }
        setOpen(false);
      }),
    [id, doctors, removeId]
  );
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
