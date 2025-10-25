import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../services/authService";

function ProtectedRoute() {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default ProtectedRoute;