import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="page">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return user.role === "admin" ? children : <Navigate to="/" replace />;
}

export default AdminRoute;