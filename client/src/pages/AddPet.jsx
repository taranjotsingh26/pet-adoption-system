import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AddPet() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    species: "Dog",
    breed: "",
    age: "",
    gender: "Male",
    size: "Medium",
    color: "",
    vaccinated: false,
    description: "",
    shelterLocation: "",
    imageUrl: "",

    // ✅ NEW CONTACT FIELDS
    ownerName: "",
    ownerPhone: "",
    ownerEmail: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

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
      await API.post("/pets", {
        ...formData,
        age: Number(formData.age)
      });

      setMessage("Pet added successfully!");

      setTimeout(() => {
        navigate("/pets");
      }, 1000);
    } catch (err) {
      setError("Failed to add pet");
    }
  };

  return (
    <div className="page">
      <h1>Add New Pet</h1>

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

        {/* 🔥 CONTACT SECTION */}
        <h3 style={{ marginTop: "20px" }}>Owner Contact Details</h3>

        <input
          type="text"
          name="ownerName"
          placeholder="Owner Name"
          value={formData.ownerName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="ownerPhone"
          placeholder="Owner Phone"
          value={formData.ownerPhone}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="ownerEmail"
          placeholder="Owner Email"
          value={formData.ownerEmail}
          onChange={handleChange}
          required
        />

        <button type="submit" className="submit-btn">
          Add Pet
        </button>

        {message && <p className="success-msg">{message}</p>}
        {error && <p className="error-msg">{error}</p>}
      </form>
    </div>
  );
}

export default AddPet;