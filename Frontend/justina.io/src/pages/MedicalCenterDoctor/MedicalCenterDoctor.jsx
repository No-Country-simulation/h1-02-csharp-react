import DrHomeSearchBar from "../../components/DrHomeSearchbar/DrHomeSearchBar";
import { HeartIcon } from "../../components/icons";
import MedicalCenterDoctorTable from "./MedicalCenterDoctorTable";

const MedicalCenterDoctor = () => {
  return (
    <section>
      <div className="flex flex-col justify-center items-center gap-y-8">
        <div className="flex flex-col justify-center items-center gap-y-3 w-full max-w-[768px]">
          <h2 className="text-neutrals600 font-bold">Busca un medico *</h2>
          <DrHomeSearchBar />
        </div>
        <button className="flex justify-center items-center gap-x-2 text-primary font-normal leading-[120%] bg-rose-o20 rounded-[32px] py-2 px-4 shadow-glass-effect">
          <HeartIcon /> Agregar medico
        </button>
        <div>
          <MedicalCenterDoctorTable />
        </div>
      </div>
    </section>
  );
};

export default MedicalCenterDoctor;
