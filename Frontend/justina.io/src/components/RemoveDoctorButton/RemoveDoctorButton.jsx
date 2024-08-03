import handleDeleteDoctor from "../../hooks/useHandleDeleteDoctor";
import useDoctorStore from "../../store/useDoctorStore";

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
    <span className="no-style">
      <button
        onClick={onRemove}
        className="p-1 w-[2.115rem] rounded-full text-error-200 bg-rose-o60 -me-7 transition-all font-semibold hover:font-bold"
      >
        X
      </button>
    </span>
  );
};

export default RemoveDoctorButton;
