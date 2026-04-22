import { useEffect, useMemo, useState } from "react";
import API from "../services/api";
import PetCard from "../components/PetCard";

function Pets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [locationTerm, setLocationTerm] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchPets = async () => {
    try {
      const response = await API.get("/pets");
      setPets(response.data.data);
    } catch (err) {
      setError("Failed to load pets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this pet?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/pets/${id}`);
      setPets((prevPets) => prevPets.filter((pet) => pet._id !== id));
    } catch (err) {
      alert("Failed to delete pet");
    }
  };

  const handleAdopt = async (id) => {
    const confirmAdopt = window.confirm("Mark this pet as adopted?");
    if (!confirmAdopt) return;

    try {
      const response = await API.patch(`/pets/${id}/adopt`);
      const updatedPet = response.data.data;

      setPets((prevPets) =>
        prevPets.map((pet) => (pet._id === id ? updatedPet : pet))
      );
    } catch (err) {
      alert("Failed to adopt pet");
    }
  };

  const filteredPets = useMemo(() => {
    return pets.filter((pet) => {
      const matchesSearch = pet.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesLocation = (pet.shelterLocation || "")
        .toLowerCase()
        .includes(locationTerm.toLowerCase());

      const matchesSpecies =
        speciesFilter === "All" || pet.species === speciesFilter;

      const matchesStatus =
        statusFilter === "All" || pet.adoptionStatus === statusFilter;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesSpecies &&
        matchesStatus
      );
    });
  }, [pets, searchTerm, locationTerm, speciesFilter, statusFilter]);

  if (loading) return <div className="page">Loading pets...</div>;
  if (error) return <div className="page">{error}</div>;

  return (
    <div className="page">
      <div className="pets-hero">
        <div className="pets-hero-content">
          <h1>Find Your New Best Friend</h1>
          <p>Search pets by name, location, species, and adoption status.</p>
        </div>
      </div>

      <div className="pets-search-panel">
        <input
          type="text"
          placeholder="Search by pet name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <input
          type="text"
          placeholder="Search by location"
          value={locationTerm}
          onChange={(e) => setLocationTerm(e.target.value)}
        />

        <select
          value={speciesFilter}
          onChange={(e) => setSpeciesFilter(e.target.value)}
        >
          <option value="All">All Species</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Bird">Bird</option>
          <option value="Rabbit">Rabbit</option>
          <option value="Other">Other</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Available">Available</option>
          <option value="Reserved">Reserved</option>
          <option value="Adopted">Adopted</option>
          <option value="Medical Hold">Medical Hold</option>
        </select>
      </div>

      <div className="results-info">
        Showing {filteredPets.length} of {pets.length} pets
      </div>

      <div className="pets-grid">
        {filteredPets.length > 0 ? (
          filteredPets.map((pet) => (
            <PetCard
              key={pet._id}
              pet={pet}
              onDelete={handleDelete}
              onAdopt={handleAdopt}
            />
          ))
        ) : (
          <p>No pets match your search/filter.</p>
        )}
      </div>
    </div>
  );
}

export default Pets;