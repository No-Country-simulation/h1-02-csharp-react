import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Layout from "./layouts/Layout";
import Loader from "./components/Loader/Loader";
import PrivateRoute from "./PrivateRoutes";

import {
  Login,
  Register,
  Landing,
  PatientDetails,
  TreatmentForm,
  DrHome,
  DrProfile,
} from "./pages";

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
          <PrivateRoute>
            <Suspense fallback={<Loader />}>
              <Layout>
                <DrHome />
              </Layout>
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "/patientdetails",
        element: (
          <PrivateRoute>
            <Suspense fallback={<Loader />}>
              <Layout>
                <PatientDetails />
              </Layout>
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "/treatmentform",
        element: (
          <PrivateRoute>
            <Suspense fallback={<Loader />}>
              <Layout>
                <TreatmentForm />
              </Layout>
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "/drprofile",
        element: (
          <PrivateRoute>
            <Suspense fallback={<Loader />}>
              <Layout>
                <DrProfile />
              </Layout>
            </Suspense>
          </PrivateRoute>
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
