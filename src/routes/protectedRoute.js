import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");
  console.log(storedUser);

  useEffect(() => {
    if (user === null && storedUser === null) {
      navigate("/sign-in", { replace: true });
    }
  }, [user, navigate, storedUser]);

  return children;
};

export default ProtectedRoute;
