import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Layout from "./layouts/Layout";
import Loader from "./components/Loader/Loader";
import PrivateRoute from "./PrivateRoutes";
import NotAuthenticated from "./NotAuthenticated";

import {
  Login,
  Register,
  Landing,
  PatientDetails,
  TreatmentForm,
  DrHome,
  DrProfile,
} from "./pages";

//Wrapper para el Suspense
const createSuspenseRoute = (Component) => (
  <Suspense fallback={<Loader />}>
    <Component />
  </Suspense>
);

//Crea un ruta privada con un componente con lazy
const createPrivateRoute = (Component) => (
  <PrivateRoute>
    {createSuspenseRoute(() => (
      <Layout>
        <Component />
      </Layout>
    ))}
  </PrivateRoute>
);

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
          <NotAuthenticated>{createSuspenseRoute(Landing)}</NotAuthenticated>
        ),
      },
      {
        path: "/login",
        element: (
          <NotAuthenticated>{createSuspenseRoute(Login)}</NotAuthenticated>
        ),
      },
      {
        path: "/register",
        element: (
          <NotAuthenticated>{createSuspenseRoute(Register)}</NotAuthenticated>
        ),
      },

      {
        path: "/drhome",
        element: createPrivateRoute(DrHome),
      },
      {
        path: "/patientdetails",
        element: createPrivateRoute(PatientDetails),
      },
      {
        path: "/treatmentform",
        element: createPrivateRoute(TreatmentForm),
      },
      {
        path: "/drprofile",
        element: createPrivateRoute(DrProfile),
      },
    ],
  },
]);
