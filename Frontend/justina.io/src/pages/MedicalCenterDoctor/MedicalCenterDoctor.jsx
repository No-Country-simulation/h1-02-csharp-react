import RegisterDoctorModal from "../../components/RegisterDoctorModal/RegisterDoctorModal";
import MedicalCenterDoctorTable from "./MedicalCenterDoctorTable";
import MedicalCenterSearchBar from "./MedicalCenterSearchBar";
import RegisterDoctorButton from "./RegisterDoctorButton";

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
      <RegisterDoctorModal />
    </section>
  );
};

export default MedicalCenterDoctor;
