import { Navigate } from "react-router-dom";
import { getToken } from "../utils/helpers";

const AuthLayout = ({ children, isPublic }) => {
  const token = getToken();

  if (isPublic && token) {
    return <Navigate to="/" replace />;
  }

  if (!isPublic && !token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default AuthLayout;
