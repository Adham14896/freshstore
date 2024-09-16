import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useContext(UserContext);

  if (localStorage.getItem("userToken") && isLoggedIn) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
}
