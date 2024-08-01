import useUserStore from "../../hooks/useUserStore";
import { DrHome, PatientHome, MedicalCenterHome } from "../index";

export default function Home() {
  const { user } = useUserStore();
  const isPatient = user.roles === "Patient";
  const isHealthCareProvider = user.roles === "HealthCareProvider";
  if (isPatient) return <PatientHome />;
  if (isHealthCareProvider) return <DrHome />;

  return <MedicalCenterHome />;
}
