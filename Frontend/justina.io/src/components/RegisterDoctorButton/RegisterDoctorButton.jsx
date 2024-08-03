import { HeartIcon } from "../../components/icons";
import useDoctorStore from "../../store/useDoctorStore";

export default function RegisterDoctorButton() {
  const { setOpenRegisterDoctor } = useDoctorStore();
  return (
    <button
      onClick={() => setOpenRegisterDoctor(true)}
      className="flex justify-center items-center gap-x-2 text-primary font-normal leading-[120%] bg-rose-o20 rounded-[32px] py-2 px-4 shadow-glass-effect"
    >
      <HeartIcon /> Agregar medico
    </button>
  );
}
