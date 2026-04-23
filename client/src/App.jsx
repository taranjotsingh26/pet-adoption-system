import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Pets from "./pages/Pets";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AddPet from "./pages/AddPet";
import AdminDashboard from "./pages/AdminDashboard";
import EditPet from "./pages/EditPet";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();

  return (
    <>
      {user && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pets"
          element={
            <ProtectedRoute>
              <Pets />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-pet"
          element={
            <ProtectedRoute>
              <AddPet />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-pet/:id"
          element={
            <ProtectedRoute>
              <EditPet />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<Navigate to={user ? "/" : "/login"} replace />}
        />
      </Routes>
    </>
  );
}

export default App;