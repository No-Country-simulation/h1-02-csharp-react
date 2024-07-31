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
  PatientDetails,
  TreatmentForm,
  DrProfile,
  Home,
} from "./pages";
import RootComponent from "./RootComponent";

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
        element: createSuspenseRoute(RootComponent),
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
        path: "/inicio",
        element: createPrivateRoute(Home),
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
