import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/sign-in", { replace: true });
    }
  }, [user, navigate]);

  if (user === null) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
