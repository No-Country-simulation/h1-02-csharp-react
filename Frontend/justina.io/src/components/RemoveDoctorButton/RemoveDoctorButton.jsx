import handleDeleteDoctor from "../../hooks/useHandleDeleteDoctor";
import useDoctorStore from "../../store/useDoctorStore";
import { CrossIcon } from "../icons";

const RemoveDoctorButton = ({ id }) => {
  const { removeId } = useDoctorStore();
  const onRemove = () => {
    handleDeleteDoctor(id).then((res) => {
      if (res) {
        removeId(id);
      }
    });
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
