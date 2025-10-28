import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { getSession, clearSession } from "../services/authService";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

function ProtectedRoute() {
  const navigate = useNavigate();
  const [session, setSession] = useState(getSession());

  useEffect(() => {
    if (!session) {
      navigate("/auth/login");
    } else if (new Date(session.expireAt) <= new Date()) {
      clearSession()
      toast.error("Your session has expired — please log in again.");
      navigate("/auth/login");
    }
  }, [session, navigate]);

  if (!session || (session && new Date(session.expireAt) <= new Date())) {
    return null;
  }

  return <Outlet />;
}

export default ProtectedRoute;