import { Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Loader from './components/Loader/Loader'

import {
    Login,
    Register,
    Landing,
    DrDashboard,
    Home,
<<<<<<< Updated upstream
    PatientDetails,
    PrescriptionForm,
    TreatmentForm,
    PatologyForm,
    MedicalRecord
=======
    ListadoPacientes,
    DrProfile
>>>>>>> Stashed changes
  } from './pages'


export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loader />}>
        <MainLayout />
      </Suspense>
    ),
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<Loader />}>
            <Landing />
          </Suspense>
        )
      }, 
      {
        path: '/login',
        element: (
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        )
      },   
      {
        path: '/register',
        element: (
          <Suspense fallback={<Loader />}>
            <Register />
          </Suspense>
        )
      }, 
      {
        path: '/home',
        element: (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        )
      },  
      {
        path: '/drdashboard',
        element: (
          <Suspense fallback={<Loader />}>
            <DrDashboard />
          </Suspense>
        )
      },
      {
        path: '/listado-pacientes',
        element: (
          <Suspense fallback={<Loader />}>
            <ListadoPacientes />
          </Suspense>
        )
      },  
      {
<<<<<<< Updated upstream
        path: '/patientdetails',
        element: (
          <Suspense fallback={<Loader />}>
            <PatientDetails />
          </Suspense>
        )
      },  
      {
        path: '/prescriptionform',
        element: (
          <Suspense fallback={<Loader />}>
            <PrescriptionForm />
          </Suspense>
        )
      },  
      {
        path: '/treatmentform',
        element: (
          <Suspense fallback={<Loader />}>
            <TreatmentForm />
          </Suspense>
        )
      }, 
      {
        path: '/patologyform',
        element: (
          <Suspense fallback={<Loader />}>
            <PatologyForm />
          </Suspense>
        )
      }, 
      {
        path: '/medicalrecord',
        element: (
          <Suspense fallback={<Loader />}>
            <MedicalRecord />
          </Suspense>
        )
      }, 
=======
        path: '/perfil-medico',
        element: (
          <Suspense fallback={<Loader />}>
            <DrProfile />
          </Suspense>
        )
      },
>>>>>>> Stashed changes
    ]
  }
])

/*
if you wants to add a new route please create a new component
on the pages file ./pages

then

add a new object with the path and element properties

    {
        path: '',
        element: <>
      },

      inside the children propertie.
*/