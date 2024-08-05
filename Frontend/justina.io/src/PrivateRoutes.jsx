import { Navigate } from "react-router-dom";
import useUserStore from "./store/useUserStore";

export default function PrivateRoute({ children, allowedRoles = ["any"] }) {
  const { token, user } = useUserStore();
  const isAuthenticated = !!token && user !== null;
  const isAllowed = allowedRoles.some(
    (role) => role === "any" || user?.roles?.includes(role)
  );
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return isAllowed ? children : <Navigate to="/" />;
}
