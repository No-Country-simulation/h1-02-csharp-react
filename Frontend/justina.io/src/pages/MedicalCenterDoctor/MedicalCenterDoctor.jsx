import MedicalCenterDoctorTable from "./MedicalCenterDoctorTable";
import MedicalCenterSearchBar from "./MedicalCenterSearchBar";
import RegisterDoctorButton from "../../components/RegisterDoctorButton/RegisterDoctorButton";

const MedicalCenterDoctor = () => {
  return (
    <section>
      <div className="flex flex-col justify-center items-center gap-y-8">
        <MedicalCenterSearchBar />
        <RegisterDoctorButton />
        <div>
          <MedicalCenterDoctorTable />
        </div>
      </div>
    </section>
  );
};

export default MedicalCenterDoctor;
