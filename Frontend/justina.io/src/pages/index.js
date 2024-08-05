import { lazy } from "react";
const Landing = lazy(() => import("./Landing/LandingContainer"));
const Login = lazy(() => import("./Login/LoginContainer"));
const Register = lazy(() => import("./Register/RegisterContainer"));

const PatientDetails = lazy(() =>
  import("./PatientDetails/PatientDetailsContainer")
);

const TreatmentForm = lazy(() =>
  import("./TreatmentForm/TreatmentFormContainer")
);

const DrProfile = lazy(() => import("./DrProfile/DrProfileContainer"));
const DrHome = lazy(() => import("./DrHome/DrHomeContainer"));
const Home = lazy(() => import("./home/Home"));
const PatientHome = lazy(() => import("./PatientHome/PatientHomeContainer"));
const MedicalCenterHome = lazy(() =>
  import("./MedicalCenterHome/MedicalCenterHome")
);
const MedicalCenterDoctor = lazy(() =>
  import("./MedicalCenterDoctor/MedicalCenterDoctor")
);
const MedicalCenterRecords = lazy(() =>
  import("./MedicalCenterRecords/MedicalCenterRecords")
);
const PatientRecords = lazy(() => import("./PatientRecords/PatientRecords"));

const PatientProfile = lazy(() => import("./PatientProfile/PatientProfile"));

const PatientStudies = lazy(()=> import("./PatientStudies/PatientStudies"));

const NotFound = lazy(()=> import("./NotFound/NotFound"))

export {
  Login,
  Register,
  Landing,
  PatientDetails,
  TreatmentForm,
  DrHome,
  DrProfile,
  Home,
  PatientHome,
  PatientRecords,
  PatientProfile,
  PatientStudies,
  MedicalCenterHome,
  MedicalCenterDoctor,
  MedicalCenterRecords,
  NotFound
};
