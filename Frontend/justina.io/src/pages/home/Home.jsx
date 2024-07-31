import useUserStore from "../../hooks/useUserStore";
import { DrHome, PatientDetails } from "../";

export default function Home() {
  const { user } = useUserStore();
  const isPatient = user.roles === "Patient";
  if (!isPatient) return <DrHome />;
  return <PatientDetails />;
}
