import { lazy } from 'react'
const Landing = lazy(() => import('./Landing/LandingContainer'))
const Login = lazy(() => import('./Login/LoginContainer'))
const Register = lazy(() => import('./Register/RegisterContainer'))

const PatientDetails= lazy(() => import('./PatientDetails/PatientDetailsContainer'))

const TreatmentForm= lazy(() => import('./TreatmentForm/TreatmentFormContainer'))

const DrProfile = lazy(() => import('./DrProfile/DrProfileContainer'))
const DrHome = lazy(() => import('./DrHome/DrHomeContainer'))
const Home = lazy(()=> import('./home/Home'))

export {
    Login,
    Register,
    Landing,
    PatientDetails,
    TreatmentForm,
    DrHome,
    DrProfile,Home
}