import { lazy } from 'react'
const Landing = lazy(() => import('./Landing/LandingContainer'))
const Login = lazy(() => import('./Login/LoginContainer'))
const Register = lazy(() => import('./Register/RegisterContainer'))
const DrDashboard = lazy(() => import('./DrDashboard/DrDashboardContainer'))
const Home = lazy(() => import('./Home/Home'))
const PatientDetails= lazy(() => import('./PatientDetails/PatientDetailsContainer'))
const PrescriptionForm= lazy(() => import('./PrescriptionForm/PrescriptionFormContainer'))
const TreatmentForm= lazy(() => import('./TreatmentForm/TreatmentFormContainer'))
const PatologyForm= lazy(() => import('./PatologyForm/PatologyFormContainer'))
const MedicalRecord= lazy(() => import('./MedicalRecord/MedicalRecordContainer'))

export {
    Login,
    Register,
    Landing,
    DrDashboard,
    Home,
    PatientDetails,
    PrescriptionForm,
    TreatmentForm,
    PatologyForm,
    MedicalRecord
}