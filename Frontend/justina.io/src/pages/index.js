import { lazy } from 'react'
const Landing = lazy(() => import('./Landing/LandingContainer'))
const Login = lazy(() => import('./Login/LoginContainer'))
const Register = lazy(() => import('./Register/RegisterContainer'))
const DrDashboard = lazy(() => import('./DrDashboard/DrDashboardContainer'))

export {
    Login,
    Register,
    Landing,
    DrDashboard
}