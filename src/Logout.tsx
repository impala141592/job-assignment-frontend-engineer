import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

export default function Logout() {
  const { logout } = useAuth();
  const history = useHistory();

  useEffect(() => {
    logout();
    history.push("/");
  }, [logout, history]);

  return null;
}