import { HeartIcon } from "../../components/icons";
import MedicalCenterDoctorTable from "./MedicalCenterDoctorTable";
import MedicalCenterSearchBar from "./MedicalCenterSearchBar";

const MedicalCenterDoctor = () => {
  return (
    <section>
      <div className="flex flex-col justify-center items-center gap-y-8">
        <MedicalCenterSearchBar />
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
