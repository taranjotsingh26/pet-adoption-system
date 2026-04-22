import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Home() {
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    adopted: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/pets");
        const pets = res.data.data;

        setStats({
          total: pets.length,
          available: pets.filter(p => p.adoptionStatus === "Available").length,
          adopted: pets.filter(p => p.adoptionStatus === "Adopted").length
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="home">

      {/* HERO SECTION */}
      <div className="hero">
        <div className="hero-content">
          <h1>Find Your Perfect Companion 🐾</h1>
          <p>
            Adopt pets, manage shelters, and give animals a loving home.
          </p>

          <div className="hero-buttons">
            <Link to="/pets" className="primary-btn">
              Browse Pets
            </Link>
            <Link to="/add-pet" className="secondary-btn">
              Add Pet
            </Link>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="stats-section">
        <div className="stat-card">
          <h3>Total Pets</h3>
          <p>{stats.total}</p>
        </div>

        <div className="stat-card">
          <h3>Available</h3>
          <p>{stats.available}</p>
        </div>

        <div className="stat-card">
          <h3>Adopted</h3>
          <p>{stats.adopted}</p>
        </div>
      </div>

      {/* INFO SECTION */}
      <div className="info-section">
        <h2>Why Choose Our Platform?</h2>

        <div className="info-grid">
          <div className="info-card">
            <h3>Easy Adoption</h3>
            <p>Find and adopt pets with a smooth and simple process.</p>
          </div>

          <div className="info-card">
            <h3>Manage Shelters</h3>
            <p>Track pets, manage data, and monitor adoption status.</p>
          </div>

          <div className="info-card">
            <h3>Real-Time Updates</h3>
            <p>Stay updated with the latest pets available for adoption.</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Home;