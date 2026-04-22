import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-brand">Pet Shelter</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/pets">Pets</Link>
        <Link to="/add-pet">Add Pet</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/admin">Admin</Link>
      </div>
    </nav>
  );
}

export default Navbar;