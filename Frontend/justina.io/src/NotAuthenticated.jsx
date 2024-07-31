import { Navigate } from "react-router-dom";
import useUserStore from "./hooks/useUserStore";

export default function NotAuthenticated({ children }) {
  const { token, user } = useUserStore();
  const isNotAuthenticated = !token || user == null;

  return isNotAuthenticated ? children : <Navigate to="/login" />;
}
