import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function ProtectedRoute({ children }) {
  if (localStorage.getItem("userToken")) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
}
