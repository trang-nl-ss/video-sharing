import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

interface RequireAuthProps {
  children?: React.ReactNode;
}

export const RequireAuth: React.FunctionComponent<RequireAuthProps> = ({
  children,
}) => {
  const auth = useAuth();
  const location = useLocation();
  if (!auth.isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return <div>{children}</div>;
};
