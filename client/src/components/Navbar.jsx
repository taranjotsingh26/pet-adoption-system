import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { logout, user } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-brand">Pet Shelter</div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/pets">Pets</Link>
        <Link to="/add-pet">Add Pet</Link>
        {user?.role === "admin" && <Link to="/admin">Admin</Link>}
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>

        <span className="nav-user">
          {user?.name} ({user?.role})
        </span>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;