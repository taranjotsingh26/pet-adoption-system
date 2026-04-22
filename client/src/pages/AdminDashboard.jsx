import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function AdminDashboard() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await API.get("/pets");
        setPets(response.data.data || []);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      }
    };

    fetchPets();
  }, []);

  const totalPets = pets.length;
  const availablePets = pets.filter(
    (pet) => pet.adoptionStatus === "Available"
  ).length;
  const adoptedPets = pets.filter(
    (pet) => pet.adoptionStatus === "Adopted"
  ).length;
  const reservedPets = pets.filter(
    (pet) => pet.adoptionStatus === "Reserved"
  ).length;

  return (
    <div className="page">
      <h1>Admin Dashboard</h1>
      <p>Manage pets and monitor shelter activity.</p>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Total Pets</h3>
          <p>{totalPets}</p>
        </div>

        <div className="dashboard-card">
          <h3>Available</h3>
          <p>{availablePets}</p>
        </div>

        <div className="dashboard-card">
          <h3>Adopted</h3>
          <p>{adoptedPets}</p>
        </div>

        <div className="dashboard-card">
          <h3>Reserved</h3>
          <p>{reservedPets}</p>
        </div>
      </div>

      <div className="quick-actions">
        <Link to="/add-pet" className="action-btn">Add New Pet</Link>
        <Link to="/pets" className="action-btn secondary-btn">View All Pets</Link>
      </div>
    </div>
  );
}

export default AdminDashboard;