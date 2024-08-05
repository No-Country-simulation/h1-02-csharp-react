import { Navigate } from "react-router-dom";
import useUserStore from "./store/useUserStore";

export default function PrivateRoute({ children }) {
  const { token, user } = useUserStore();
  const isAuthenticated = !!token && user !== null;

  return isAuthenticated ? children : <Navigate to="/login" />;
}