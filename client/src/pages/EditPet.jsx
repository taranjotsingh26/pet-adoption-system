import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function EditPet() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    species: "Dog",
    breed: "",
    age: "",
    gender: "Male",
    size: "Medium",
    color: "",
    shelterLocation: "",
    imageUrl: "",
    description: "",
    vaccinated: false,
    adoptionStatus: "Available"
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await API.get(`/pets/${id}`);
        const pet = response.data.data;

        setFormData({
          name: pet.name || "",
          species: pet.species || "Dog",
          breed: pet.breed || "",
          age: pet.age || "",
          gender: pet.gender || "Male",
          size: pet.size || "Medium",
          color: pet.color || "",
          shelterLocation: pet.shelterLocation || "",
          imageUrl: pet.imageUrl || "",
          description: pet.description || "",
          vaccinated: pet.vaccinated || false,
          adoptionStatus: pet.adoptionStatus || "Available"
        });
      } catch (err) {
        setError("Failed to load pet data");
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await API.put(`/pets/${id}`, {
        ...formData,
        age: Number(formData.age)
      });

      setMessage("Pet updated successfully!");

      setTimeout(() => {
        navigate("/pets");
      }, 1000);
    } catch (err) {
      setError("Failed to update pet");
    }
  };

  if (loading) return <div className="page">Loading pet details...</div>;
  if (error && !formData.name) return <div className="page">{error}</div>;

  return (
    <div className="page">
      <h1>Edit Pet</h1>

      <form className="pet-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Pet Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <select name="species" value={formData.species} onChange={handleChange}>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Bird">Bird</option>
          <option value="Rabbit">Rabbit</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="text"
          name="breed"
          placeholder="Breed"
          value={formData.breed}
          onChange={handleChange}
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        />

        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <select name="size" value={formData.size} onChange={handleChange}>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>

        <input
          type="text"
          name="color"
          placeholder="Color"
          value={formData.color}
          onChange={handleChange}
        />

        <input
          type="text"
          name="shelterLocation"
          placeholder="Shelter Location"
          value={formData.shelterLocation}
          onChange={handleChange}
        />

        <input
          type="url"
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
        />

        <select
          name="adoptionStatus"
          value={formData.adoptionStatus}
          onChange={handleChange}
        >
          <option value="Available">Available</option>
          <option value="Reserved">Reserved</option>
          <option value="Adopted">Adopted</option>
          <option value="Medical Hold">Medical Hold</option>
        </select>

        <textarea
          name="description"
          placeholder="Description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
        />

        <label className="checkbox-row">
          <input
            type="checkbox"
            name="vaccinated"
            checked={formData.vaccinated}
            onChange={handleChange}
          />
          Vaccinated
        </label>

        <button type="submit" className="submit-btn">
          Update Pet
        </button>

        {message && <p className="success-msg">{message}</p>}
        {error && <p className="error-msg">{error}</p>}
      </form>
    </div>
  );
}

export default EditPet;