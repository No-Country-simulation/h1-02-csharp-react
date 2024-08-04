import useUserStore from "../../store/useUserStore";
import { DrHome, PatientHome, MedicalCenterHome } from "../index";
import { Suspense } from "react";
import RecordingNotes from "../../components/RecordingNote";

export default function Home() {
  const { user } = useUserStore();
  const isPatient = user.roles === "Patient";
  const isHealthCareProvider = user.roles === "HealthCareProvider";
  if (isPatient)
    return (
      <>
        <PatientHome />
        <Suspense>
          <RecordingNotes />
        </Suspense>
      </>
    );
  if (isHealthCareProvider) return <DrHome />;

  return <MedicalCenterHome />;
}
