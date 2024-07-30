import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Loader from "./components/Loader/Loader";

import {
  Login,
  Register,
  Landing,
  PatientDetails,
  TreatmentForm,
  DrHome,
  DrProfile,
} from "./pages";

//TODO: Agregar seguridad a las rutas
//TODO: Si no hay Landing / Home redirigi al Login directamente (Agregar link al registro en el login)
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <MainLayout />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loader />}>
            <Landing />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/register",
        element: (
          <Suspense fallback={<Loader />}>
            <Register />
          </Suspense>
        ),
      },

      {
        path: "/drhome",
        element: (
          <Suspense fallback={<Loader />}>
            <DrHome />
          </Suspense>
        ),
      },
      {
        path: "/patientdetails",
        element: (
          <Suspense fallback={<Loader />}>
            <PatientDetails />
          </Suspense>
        ),
      },
      {
        path: "/treatmentform",
        element: (
          <Suspense fallback={<Loader />}>
            <TreatmentForm />
          </Suspense>
        ),
      },
      {
        path: "/drprofile",
        element: (
          <Suspense fallback={<Loader />}>
            <DrProfile />
          </Suspense>
        ),
      },
    ],
  },
]);

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
