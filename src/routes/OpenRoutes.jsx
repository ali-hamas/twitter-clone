import { useAuth } from "../contexts";
import { Navigate, Outlet } from "react-router-dom";

const OpenRoutes = () => {
  const { user } = useAuth();
  return !user ? <Outlet /> : <Navigate to={"/home"} />;
};

export default OpenRoutes;
