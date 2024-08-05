import MedicalCenterDoctorTable from "./MedicalCenterDoctorTable";
import MedicalCenterSearchBar from "./MedicalCenterSearchBar";
import RegisterDoctorButton from "../../components/RegisterDoctorButton/RegisterDoctorButton";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";

const MedicalCenterDoctor = () => {
  return (
    <>
      <section>
        <div className="flex flex-col justify-center items-center gap-y-8">
          <MedicalCenterSearchBar />
          <RegisterDoctorButton />
          <div>
            <MedicalCenterDoctorTable />
          </div>
        </div>
      </section>
      <ConfirmModal
        message="Confirmo que quiero eliminar al medico"
        currentType="RemoveDoctor"
      />
    </>
  );
};

export default MedicalCenterDoctor;
